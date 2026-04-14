import express from "express"



import { protect } from "../middleware/authMiddleware.js"
import { getNotification ,markSingleNotificationRead } from "../controllers/notificationController.js"



const notificationRouter = express.Router()



notificationRouter.get('/get-notifications', protect, getNotification)

notificationRouter.put("/mark-read/:notificationId", protect, markSingleNotificationRead)




export default notificationRouter