

import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import Resume from "../models/ResumeModel.js"

dotenv.config()


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

        // check if user already exist

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "User already exist" })
        }


        // create new user then hash password

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name, email, password: hashedPassword
        })


        // return succes message
        const token = generateToken(newUser._id)
        newUser.password = undefined


        return res.status(201).json({ message: "User create successfully", token, user: newUser })
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

        // check if user already exist

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        // check if password is correct

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // return succes message
        const token = generateToken(user._id)
        user.password = undefined





        return res.status(200).json({ message: "Login successfull", token, user })
    } catch (error) {
        return res.status(400).json({ message: error.message })

    }

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

export const getUserResume = async(req,res)=>{
    try{
        const userId = req.userId
        // return user resumes
        const resumes = await Resume.find({userId})
        return res.status(200).json({resumes})

    }catch(error){
        return res.status(401).json({message:error.message})
    }
}

