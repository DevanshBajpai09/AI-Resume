import express from "express";

import upload from "../config/multer.js";
import { uploadPdf , getPdf ,getPdfFile } from "../controllers/pdfController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("pdf"),
  uploadPdf
);

router.get(
  "/:id",
  protect,
  getPdf
);


// Get actual PDF
router.get(
  "/:id/file",
  protect,
  getPdfFile
);


export default router;