import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,

  amount: Number,
  currency: {
    type: String,
    default: "INR"
  },

  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment',paymentSchema)
export default Payment
