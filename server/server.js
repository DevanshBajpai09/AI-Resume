import express from "express";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv"
import userRouter from "./routes/userRoute.js";
import resumeRouter from "./routes/resumeRoute.js";
import aiRouter from "./routes/aiRoute.js";
import connectDB from "./config/db.js";
import paymentRouter from "./routes/paymentRoute.js";
import analyticsRouter from "./routes/analyticsRouter.js";


dotenv.config()



const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Server is live"));
app.use("/api/users", userRouter);
app.use("/api/resumes",resumeRouter)
app.use("/api/ai",aiRouter)
app.use("/api/payment",paymentRouter)
app.use("/api/analytics",analyticsRouter)

// connect DB, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err.message);
    process.exit(1);
  });
