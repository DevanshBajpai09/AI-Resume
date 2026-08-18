import React, { useEffect, useState } from "react";

const InternetStatusPopup = ({ isOnline }) => {
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);

    if (isOnline) {
      const timer = setTimeout(() => {
        setAnimate(false);

        setTimeout(() => {
          setVisible(false);
        }, 300);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [isOnline]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        bottom: animate ? "24px" : "-90px",
        transform: "translateX(-50%)",

        display: "flex",
        alignItems: "center",
        gap: "12px",

        minWidth: "260px",
        padding: "11px 15px",

        background: "#FBFAF6",
        border: "1px solid #CFCBBC",
        borderRadius: "0",

        boxShadow:
          "0 10px 30px rgba(23,27,36,0.12)",

        zIndex: 9999,

        transition:
          "all 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
    >

      {/* STATUS INDICATOR */}

      <div
        style={{
          width: "8px",
          height: "8px",
          flexShrink: 0,
          borderRadius: "50%",
          background: isOnline
            ? "#3B8C63"
            : "#C63B26",
          boxShadow: isOnline
            ? "0 0 0 3px #DCEFE4"
            : "0 0 0 3px #F3DDD8",
        }}
      />

      {/* CONTENT */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >

        <span
          style={{
            fontFamily:
              "'IBM Plex Mono', monospace",
            fontSize: "8px",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            color: "#7A7E89",
          }}
        >
          Connection status
        </span>

        <span
          style={{
            fontFamily:
              "'Newsreader', serif",
            fontSize: "15px",
            fontWeight: 500,
            color: isOnline
              ? "#285F43"
              : "#8F3024",
          }}
        >
          {isOnline
            ? "Internet Connected"
            : "No Internet Connection"}
        </span>

      </div>

    </div>
  );
};

export default InternetStatusPopup;