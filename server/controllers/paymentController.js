import razorpay from "../config/razorpay.js"
import Payment from "../models/paymentModel.js"
import User from "../models/UserModel.js"
import crypto from "crypto"
import resend from "../config/resend.js"
import dotenv from "dotenv"
import axios from "axios"
import invoiceTemplate from "../emails/InvoiceDesign/invoiceTemplate.js"


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
            receipt: `rcpt_${userId.toString().slice(-6)}_${Date.now()}`

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid Signature" });
    }

    const payment = await Payment.findOne({ razorpay_order_id }).populate("userId");
    if (!payment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    if (payment.status === "paid") {
      return res.json({ success: true, message: "Already verified" });
    }

    // mark paid
    payment.razorpay_payment_id = razorpay_payment_id;
    payment.razorpay_signature = razorpay_signature;
    payment.status = "paid";
    await payment.save();

    // activate premium
    const now = new Date();
    const expiry = new Date(now);
    expiry.setDate(expiry.getDate() + 30);

    await User.findByIdAndUpdate(payment.userId._id, {
      isPremium: true,
      premiumActivatedAt: now,
      premiumExpiresAt: expiry,
    });

    /* ================== GENERATE PDF ================== */

    const html = invoiceTemplate(payment);

    const { data } = await axios.post(
      "https://api.pdfshift.io/v3/convert/pdf",
      {
        source: html,
      },
      {
        headers: {
          "X-API-Key": process.env.PDFSHIFT_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    const pdfBuffer = Buffer.from(data, "binary");

    /* ================== SEND EMAIL ================== */

    await resend.emails.send({
      from: "Resume <invoice@resend.dev>",
      to: payment.userId.email,
      subject: "Your Payment Invoice",
      html: "<p>Thanks for purchasing Premium. Invoice attached.</p>",
      attachments: [
        {
          filename: "invoice.pdf",
          content: pdfBuffer,
        },
      ],
    });

    /* ================== RESPONSE ================== */

    res.json({ success: true, message: "Payment verified & invoice emailed" });

  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



export const getUserTransactions = async (req, res) => {
    try {

        const transcations = await Payment.find({ userId: req.userId }).sort({ createdAt: -1 })

        res.json(transcations)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const downloadInvoice = async (req, res) => {
    try {
        const { paymentId } = req.params;

        const payment = await Payment.findById(paymentId).populate("userId");
        if (!payment) return res.status(404).json({ message: "Payment not found" });

        // security check
        if (payment.userId._id.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // generate HTML
        const html = invoiceTemplate(payment);

        // call PDFShift
        const response = await axios.post(
            "https://api.pdfshift.io/v3/convert/pdf",
            {
                source: html,
            },
            {
                headers: {
                    "X-API-Key": process.env.PDFSHIFT_KEY,
                    "Content-Type": "application/json",
                },
                responseType: "arraybuffer",
            }
        );


        const pdfBuffer = Buffer.from(response.data);

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=invoice_${paymentId}.pdf`,
        });

        return res.send(pdfBuffer);
    } catch (error) {
        console.error("PDFShift error:", error.message);
        return res.status(500).json({ message: "Invoice generation failed" });
    }
};

