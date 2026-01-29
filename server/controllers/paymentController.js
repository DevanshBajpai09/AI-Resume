import razorpay from "../config/razorpay.js"
import Payment from "../models/paymentModel.js"
import User from "../models/UserModel.js"
import crypto from "crypto"

import dotenv from "dotenv"

dotenv.config()



export const paymentCreateOrder = async (req, res) => {
    try {
        
        const userId = req.userId
        

        




        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        if (user.isPremium) {
            return res.status(400).json({ message: "User already has premium access" });
        }

        const order = await razorpay.orders.create({
            amount: 19900,
            currency: "INR",
            receipt: `rcpt_${userId.slice(-6)}_${Date.now()}`
        })

        await Payment.create({
            userId,
            razorpay_order_id: order.id,
            amount: order.amount,
            status: "created"
        })

        res.json({ orderId: order.id, amount: order.amount, currency: order.currency, key: process.env.RAZORPAY_KEY_ID })



    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        const body = razorpay_order_id + "|" + razorpay_payment_id;


        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body).digest("hex")


        if (expectedSignature != razorpay_signature) {
            return res.status(200).json({ message: "Invalid Signature" })
        }

        const payment = await Payment.findOne({ razorpay_order_id })
        if (!payment) {
            return res.status(404).json({ message: "Payment record not found" })
        }

        payment.razorpay_payment_id = razorpay_payment_id
        payment.razorpay_signature = razorpay_signature
        payment.status = "paid"

        await payment.save()

        await User.findByIdAndUpdate(payment.userId, { isPremium: true, premiumActivatedAt: new Date() })
        res.json({ success: true })

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}