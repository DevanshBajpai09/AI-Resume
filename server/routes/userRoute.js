import express from "express"
import { getUserID, getUserResume, loginUser, registerUser, verifyEmail } from "../controllers/UserController.js"

import { loginLimiter } from "../middleware/loginMiddlewares.js"
import { protect } from "../middleware/authMiddleware.js"



const userRouter = express.Router()



userRouter.post('/register',registerUser)
userRouter.post('/login',loginLimiter,loginUser)
userRouter.get('/data',protect,getUserID)
userRouter.get('/resumes',protect,getUserResume)
userRouter.get('/verify-email',verifyEmail)


export default userRouter