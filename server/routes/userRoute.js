import express from "express"
import { getUserID, getUserResume,googleCallback,
  githubCallback, loginUser, registerUser, verifyEmail } from "../controllers/UserController.js"

import { loginLimiter } from "../middleware/loginMiddlewares.js"
import { protect } from "../middleware/authMiddleware.js"
import passport from "../config/passport.js";




const userRouter = express.Router()



userRouter.post('/register',registerUser)
userRouter.post('/login',loginLimiter,loginUser)
userRouter.get('/data',protect,getUserID)
userRouter.get('/resumes',protect,getUserResume)
userRouter.get('/verify-email',verifyEmail)
// Google
userRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

userRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed`,
  }),
  googleCallback
);


// GitHub
userRouter.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

userRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=github_failed`,
  }),
  githubCallback
);


export default userRouter