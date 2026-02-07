import express from "express"


import { protect } from "../middleware/authMiddleware.js"
import { getAnalytics } from "../controllers/analyticsController.js"




const analyticsRouter = express.Router()


analyticsRouter.get("/summary", protect, getAnalytics)


export default analyticsRouter