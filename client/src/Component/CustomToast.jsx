import React, { useEffect, useState } from "react";
import {
  Check,
  X,
  AlertTriangle,
  Info,
  XCircle,
} from "lucide-react";

const CustomToast = ({
  type = "success",
  message,
  duration = 3500,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
    });

    const timer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        onClose?.();
      }, 220);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      label: "Success",
      icon: Check,
      accent: "#2D7A50",
    },

    error: {
      label: "Error",
      icon: XCircle,
      accent: "#C63B26",
    },

    warning: {
      label: "Warning",
      icon: AlertTriangle,
      accent: "#9A6A16",
    },

    info: {
      label: "Info",
      icon: Info,
      accent: "#315C8A",
    },
  };

  const current = config[type] || config.success;
  const Icon = current.icon;

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 99999,

        width: "min(380px, calc(100vw - 32px))",

        background: "#FFFFFF",
        border: "1px solid #CFCBBC",
        borderLeft: `3px solid ${current.accent}`,

        boxShadow:
          "5px 5px 0 rgba(23, 27, 36, 0.08)",

        transform: visible
          ? "translateX(0)"
          : "translateX(30px)",

        opacity: visible ? 1 : 0,

        transition:
          "transform .22s ease, opacity .22s ease",

        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* TOP */}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "14px 14px 12px 15px",
        }}
      >
        {/* ICON */}

        <div
          style={{
            width: "30px",
            height: "30px",

            flexShrink: 0,

            border: `1px solid ${current.accent}`,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            color: current.accent,
          }}
        >
          <Icon
            size={15}
            strokeWidth={1.8}
          />
        </div>

        {/* CONTENT */}

        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontFamily:
                "'IBM Plex Mono', monospace",

              fontSize: "8px",

              textTransform:
                "uppercase",

              letterSpacing: ".1em",

              color: current.accent,

              marginBottom: "5px",
            }}
          >
            {current.label}
          </div>

          <div
            style={{
              fontSize: "12px",
              lineHeight: 1.5,
              color: "#171B24",
              wordBreak: "break-word",
            }}
          >
            {message}
          </div>
        </div>

        {/* CLOSE */}

        <button
          type="button"
          onClick={() => {
            setVisible(false);

            setTimeout(() => {
              onClose?.();
            }, 220);
          }}
          style={{
            width: "24px",
            height: "24px",

            flexShrink: 0,

            border: "none",
            background: "transparent",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            color: "#8A8F9B",

            cursor: "pointer",

            padding: 0,
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* PROGRESS */}

      <div
        style={{
          height: "2px",
          background: "#E8E5DD",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            background: current.accent,

            transformOrigin: "left",

            animation: `toastProgress ${duration}ms linear forwards`,
          }}
        />
      </div>

      <style>
        {`
          @keyframes toastProgress {
            from {
              transform: scaleX(1);
            }

            to {
              transform: scaleX(0);
            }
          }

          @media (max-width: 600px) {
            .custom-toast {
              top: 16px;
              right: 16px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CustomToast;