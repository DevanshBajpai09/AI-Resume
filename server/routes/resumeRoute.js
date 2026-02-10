import express from "express"


import { createResume, deleteResume, getPublicResumeById, getResumeById, trackPublicResume, updateResume, updateSectionOrder } from "../controllers/ResumeController.js"
import upload from "../config/multer.js"
import { protect } from "../middleware/authMiddleware.js"



const resumeRouter = express.Router()



resumeRouter.post('/create',protect,createResume)
resumeRouter.put('/update',upload.single("image"),protect,updateResume)
resumeRouter.delete('/delete/:resumeId',protect, deleteResume)
resumeRouter.get('/get/:resumeId',protect,getResumeById)
resumeRouter.get('/public/:resumeId',getPublicResumeById)
resumeRouter.get("/view/:resumeId", trackPublicResume)
resumeRouter.put("/section-order",protect, updateSectionOrder)



export default resumeRouter