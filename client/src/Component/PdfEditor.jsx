import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";

const PdfEditor = ({ pdfId, token }) => {
  const viewerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!viewerRef.current || !pdfId || !token) return;

    let mounted = true;

    const initializeViewer = async () => {
      try {
        const instance = await WebViewer(
          {
            path: "/webviewer/lib",

            // PDF that your backend serves
            initialDoc: `http://localhost:3000/api/pdf/${pdfId}/file`,

            // Enable editing-related functionality
            fullAPI: true,
          },
          viewerRef.current
        );

        if (!mounted) return;

        instanceRef.current = instance;

        const {
          documentViewer,
          UI,
        } = instance.Core;

        // Load authenticated PDF manually
        const response = await fetch(
          `http://localhost:3000/api/pdf/${pdfId}/file`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load PDF");
        }

        const blob = await response.blob();

        const file = new File(
          [blob],
          "document.pdf",
          {
            type: "application/pdf",
          }
        );

        await instance.UI.loadDocument(file);

        // Disable tools we don't need initially
        UI.disableElements([
          "ribbons",
          "leftPanelButton",
        ]);

        console.log("PDF Viewer initialized");
      } catch (error) {
        console.error(
          "PDF EDITOR ERROR:",
          error
        );
      }
    };

    initializeViewer();

    return () => {
      mounted = false;
      instanceRef.current = null;
    };
  }, [pdfId, token]);

  return (
    <div
      ref={viewerRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "700px",
      }}
    />
  );
};

export default PdfEditor;