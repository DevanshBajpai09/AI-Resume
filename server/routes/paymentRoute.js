import express from "express"




import { protect } from "../middleware/authMiddleware.js"
import { downloadInvoice, getUserTransactions, paymentCreateOrder, verifyPayment } from "../controllers/paymentController.js"



const paymentRouter = express.Router()



paymentRouter.post('/create-order',protect,paymentCreateOrder)
paymentRouter.post('/verify',protect,verifyPayment)
paymentRouter.get('/transactions',protect,getUserTransactions)
paymentRouter.get("/invoice/:paymentId", protect, downloadInvoice);




export default paymentRouter