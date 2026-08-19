import mongoose from "mongoose";

const pdfDocumentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    originalFilePath: {
      type: String,
      required: true,
    },

    editedFilePath: {
      type: String,
      default: null,
    },

    mimeType: {
      type: String,
      default: "application/pdf",
    },

    fileSize: {
      type: Number,
      required: true,
    },

    pageCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "uploaded",
        "processing",
        "ready",
        "saving",
        "completed",
        "failed",
      ],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

const editPdf = mongoose.model("PdfDocument", pdfDocumentSchema);
export default editPdf;