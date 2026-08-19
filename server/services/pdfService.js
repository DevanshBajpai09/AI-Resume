import fs from "fs/promises";
import { PDFDocument } from "pdf-lib";

export const validateAndReadPdf = async (filePath) => {
  const fileBuffer = await fs.readFile(filePath);

  // Check PDF signature
  const header = fileBuffer
    .subarray(0, 5)
    .toString("utf8");

  if (header !== "%PDF-") {
    throw new Error("Invalid PDF file");
  }

  // Try to actually parse the PDF
  const pdfDoc = await PDFDocument.load(fileBuffer, {
    ignoreEncryption: false,
  });

  const pageCount = pdfDoc.getPageCount();

  if (pageCount === 0) {
    throw new Error("PDF contains no pages");
  }

  return {
    pageCount,
    fileSize: fileBuffer.length,
  };
};