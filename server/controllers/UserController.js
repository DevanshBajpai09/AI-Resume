

import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import Resume from "../models/ResumeModel.js"
import crypto from "crypto"
import resend from "../config/resend.js"
import { isStrongPassword } from "../config/validatePassword.js"
import verifyEmailTemplate from "../emails/verifyTemplate.js"
import welcomeEmailTemplate from "../emails/welcomeEmailTemplate.js"

dotenv.config()

const loginAttempts = new Map();


// to generate token

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7D' })
    return token

}
// POST /API/USERS/REGISTER
// CONTROLLER FOR USER REGISTATION
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // check if required field are present

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        if (!isStrongPassword(password)) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters and include uppercase, lowercase, number and special character"
            })
        }

        // check if user already exist

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "User already exist" })
        }


        // create new user then hash password

        const hashedPassword = await bcrypt.hash(password, 10)
        const verifyToken = crypto.randomBytes(32).toString("hex")

        const newUser = await User.create({
            name, email, password: hashedPassword, emailVerifyToken: verifyToken, emailVerifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000
        })


        const verifyUrl = `${process.env.FRONTEND_URL}/login?state=verify&token=${verifyToken}`


        await resend.emails.send({
            from: "Resume <onboarding@resend.dev>",
            to: email,
            subject: "Verify your email",
            html: verifyEmailTemplate({
                name,
                verifyUrl,
                logoUrl: "https://vqr4j1ulaxsrbwxr.public.blob.vercel-storage.com/logo.png"
            })
        })


        // return succes message


        return res.status(201).json({ message: "Verification link sent to email" })
    } catch (error) {
        return res.status(400).json({ message: error.message })

    }

}




// GET /API/USERS/VERIFY-EMAIL
// CONTROLLER FUNCTION TO VERIFY EMAIL


export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query

        const user = await User.findOne({
            emailVerifyToken: token,
            emailVerifyTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" })
        }
        

        user.isVerified = true
        user.emailVerifyToken = undefined
        user.emailVerifyTokenExpiry = undefined

        


        await user.save()

        await resend.emails.send({
            from: "Resume <onboarding@resend.dev>",

            to: user.email,
            subject: "Welcome to resume 🎉",
            html: welcomeEmailTemplate({
                name: user.name,
                logoUrl: "https://vqr4j1ulaxsrbwxr.public.blob.vercel-storage.com/logo.png"
            })
        })


        return res.status(200).json({
            message: "Email verified successfully. Please login."
        });

    } catch (error) {
        return res.status(400).json({ message: error.message })

    }
}


// POST /API/USERS/LOGIN
// CONTROLLER FOR USER LOGIN

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // check if required field are present

        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields" })
        }



        const now = Date.now();
        const attempts = loginAttempts.get(email)

        if (attempts && attempts.blockUntil && attempts.blockUntil > now) {
            const secondleft = Math.ceil((attempts.blockUntil - now) / 1000)
            return res.status(429).json({ message: `Too many login attempts. Please try again after ${secondleft} seconds` })
        }

        

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }




        // check if password is correct

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            registerfailedLoginAttempt(email)
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email first" })
        }


        loginAttempts.delete(email)

        

        // return succes message
        const token = generateToken(user._id)
        user.password = undefined
        





        return res.status(200).json({ message: "Login successfull", token, user })
    } catch (error) {
        return res.status(400).json({ message: error.message })

    }

}

function registerfailedLoginAttempt(email){
    const attempt = loginAttempts.get(email) || {
        attempts: 0,
        blockUntil: null
    }

    attempt.attempts += 1


    if(attempt.attempts >= 5){
        attempt.blockUntil = Date.now() + 30000 
        attempt.attempts = 0
    }

    loginAttempts.set(email, attempt)
}






// POST /API/USERS/DATA
// CONTROLLER TO USER DATA BY ID

export const getUserID = async (req, res) => {
    try {
        const userId = req.userId



        // check if user exist

        const user = await User.findById(userId)
        if (!user) {

            return res.status(404).json({ message: "User not found" })
        }

        // return user

        user.password = undefined
        return res.status(200).json({ user })


    } catch (error) {
        return res.status(400).json({ message: error.message })

    }

}



// Get /app/users/resumes
// constroller function to get user resume

export const getUserResume = async (req, res) => {
    try {
        const userId = req.userId
        // return user resumes
        const resumes = await Resume.find({ userId })
        return res.status(200).json({ resumes })

    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}

