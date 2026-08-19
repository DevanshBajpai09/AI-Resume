import editPdf from "../models/editPdfModel.js";
import { validateAndReadPdf } from "../services/pdfService.js";
import fs from "fs";
import path from "path";
export const uploadPdf = async (req, res) => {
  let pdf = null;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }

    // Create database record
    pdf = await editPdf.create({
      userId: req.userId,
      originalName: req.file.originalname,
      originalFilePath: req.file.path,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      status: "processing",
    });

    // Validate PDF and get information
    const pdfInfo = await validateAndReadPdf(
      req.file.path
    );

    // Update PDF document
    pdf.pageCount = pdfInfo.pageCount;
    pdf.fileSize = pdfInfo.fileSize;
    pdf.status = "ready";

    await pdf.save();

    return res.status(201).json({
      success: true,
      message: "PDF uploaded successfully",

      data: {
        id: pdf._id,
        fileName: pdf.originalName,
        fileSize: pdf.fileSize,
        pageCount: pdf.pageCount,
        status: pdf.status,
      },
    });

  } catch (error) {
    console.error("PDF PROCESSING ERROR:", error);

    // Update database if record was created
    if (pdf) {
      pdf.status = "failed";
      pdf.errorMessage = error.message;

      await pdf.save();
    }

    return res.status(400).json({
      success: false,
      message: error.message || "Invalid PDF file",
    });
  }
};


export const getPdf = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    const pdf = await editPdf.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: pdf._id,
        fileName: pdf.originalName,
        fileSize: pdf.fileSize,
        pageCount: pdf.pageCount,
        status: pdf.status,
        createdAt: pdf.createdAt,
        updatedAt: pdf.updatedAt,
      },
    });
  } catch (error) {
    console.error("GET PDF ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get PDF",
    });
  }
};
export const getPdfFile = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    const pdf = await editPdf.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    if (
      pdf.status !== "ready" &&
      pdf.status !== "completed"
    ) {
      return res.status(400).json({
        success: false,
        message: "PDF is not ready yet",
      });
    }

    // Use edited version if available
    const relativePath =
      pdf.editedFilePath || pdf.originalFilePath;

    // Convert relative path into absolute path
    const filePath = path.resolve(relativePath);

    console.log("PDF PATH:", filePath);

    // Check whether file actually exists
    if (!fs.existsSync(filePath)) {
      console.error("PDF FILE DOES NOT EXIST:", filePath);

      return res.status(404).json({
        success: false,
        message: "PDF file not found on server",
      });
    }

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${encodeURIComponent(
        pdf.originalName
      )}"`
    );

    return res.sendFile(filePath);

  } catch (error) {
    console.error("GET PDF FILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get PDF",
    });
  }
};