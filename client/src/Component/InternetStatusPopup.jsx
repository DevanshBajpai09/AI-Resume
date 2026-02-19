import React, { useEffect, useState } from "react";

const InternetStatusPopup = ({ isOnline }) => {
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimate(true);

    if (isOnline) {
      const timer = setTimeout(() => {
        setAnimate(false);
        setTimeout(() => setVisible(false), 300); // wait for slide-down
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
        bottom: animate ? "24px" : "-80px", // slide from down → up
        left: "50%",
        transform: "translateX(-50%)",
        padding: "14px 22px",
        borderRadius: "12px",
        color: isOnline ? "#065f46" : "#7f1d1d",
        fontWeight: "600",
        background: isOnline
          ? "linear-gradient(135deg, #d1fae5, #a7f3d0)"
          : "linear-gradient(135deg, #fee2e2, #fecaca)",
        border: isOnline
          ? "1px solid #10b981"
          : "1px solid #ef4444",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        zIndex: 9999,
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        backdropFilter: "blur(6px)",
      }}
    >
      {isOnline ? "🟢 Internet Connected" : "🔴 No Internet Connection"}
    </div>
  );
};

export default InternetStatusPopup;
