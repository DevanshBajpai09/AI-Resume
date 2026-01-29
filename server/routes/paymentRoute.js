import express from "express"




import { protect } from "../middleware/authMiddleware.js"
import { paymentCreateOrder, verifyPayment } from "../controllers/paymentController.js"



const paymentRouter = express.Router()



paymentRouter.post('/create-order',protect,paymentCreateOrder)
paymentRouter.post('/verify',protect,verifyPayment)




export default paymentRouter