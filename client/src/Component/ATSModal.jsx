import {
  X,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Search,
} from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const ATSModal = ({ resume, onClose }) => {
  const score = Number(resume?.atsScore || 0);

  const scoreColor =
    score >= 80
      ? "#16A34A"
      : score >= 60
      ? "#F97316"
      : "#EF4444";

  const scoreLabel =
    score >= 80
      ? "Excellent"
      : score >= 60
      ? "Good"
      : "Needs Improvement";

  const feedback = resume?.atsFeedback || [];
  const missingKeywords = resume?.missingKeywords || [];

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const modal = (
    <>
      <style>
        {`
          @keyframes atsOverlayIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes atsModalIn {
            from {
              opacity: 0;
              transform: translateY(12px) scale(0.98);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .ats-modal-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .ats-modal-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .ats-modal-scroll::-webkit-scrollbar-thumb {
            background: #d6d2c8;
          }

          .ats-modal-scroll {
            scrollbar-width: thin;
            scrollbar-color: #d6d2c8 transparent;
          }
        `}
      </style>

      {/* FULL SCREEN OVERLAY */}
      <div
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 999999,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          padding: "24px",
          boxSizing: "border-box",

          background: "rgba(23, 27, 36, 0.48)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",

          animation: "atsOverlayIn .2s ease-out",
        }}
      >
        {/* MODAL */}
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="ats-modal-scroll"
          style={{
            position: "relative",

            width: "100%",
            maxWidth: "680px",

            /*
              IMPORTANT:
              Don't use a fixed height.
              This prevents the modal from jumping/clipping.
            */
            maxHeight: "calc(100vh - 48px)",

            overflowY: "auto",

            background: "#FBFAF6",
            border: "1px solid #DFDACC",

            boxShadow:
              "0 30px 80px rgba(23,27,36,.25)",

            animation:
              "atsModalIn .28s cubic-bezier(.22,1,.36,1)",
          }}
        >
          {/* TOP ACCENT */}
          <div
            style={{
              height: "3px",
              width: "100%",
              background: `linear-gradient(
                90deg,
                ${scoreColor},
                #F59E0B
              )`,
            }}
          />

          {/* HEADER */}
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #DFDACC",

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              background: "#FBFAF6",

              position: "sticky",
              top: 0,
              zIndex: 5,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  background: "#F8EDEA",
                  border: "1px solid #E8C9C2",
                }}
              >
                <Sparkles
                  size={18}
                  color="#C63B26"
                  strokeWidth={1.7}
                />
              </div>

              <div>
                <div
                  style={{
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "8px",
                    textTransform: "uppercase",
                    letterSpacing: ".09em",
                    color: "#C63B26",
                  }}
                >
                  Resume diagnostics
                </div>

                <h2
                  style={{
                    margin: "3px 0 0",
                    fontFamily: "'Newsreader', serif",
                    fontSize: "23px",
                    fontWeight: 500,
                    color: "#171B24",
                  }}
                >
                  ATS Resume Analysis
                </h2>
              </div>
            </div>

            {/* CLOSE */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close ATS analysis"
              style={{
                width: "34px",
                height: "34px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                background: "transparent",
                border: "1px solid transparent",

                color: "#5B6070",
                cursor: "pointer",

                transition: "all .15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "#F1EFE8";

                e.currentTarget.style.borderColor =
                  "#DFDACC";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "transparent";

                e.currentTarget.style.borderColor =
                  "transparent";
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* CONTENT */}
          <div
            style={{
              padding: "24px",
            }}
          >
            {/* SCORE */}
            <div
              style={{
                border: "1px solid #DFDACC",
                background: "#FFFFFF",
                padding: "20px",
                marginBottom: "26px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily:
                        "'IBM Plex Mono', monospace",
                      fontSize: "8px",
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                      color: "#8A8F9B",
                    }}
                  >
                    ATS compatibility
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "7px",
                      marginTop: "5px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "'Newsreader', serif",
                        fontSize: "48px",
                        lineHeight: 1,
                        fontWeight: 500,
                        color: scoreColor,
                      }}
                    >
                      {score}
                    </span>

                    <span
                      style={{
                        fontFamily:
                          "'IBM Plex Mono', monospace",
                        fontSize: "10px",
                        color: "#8A8F9B",
                      }}
                    >
                      / 100
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    padding: "6px 10px",
                    border: `1px solid ${scoreColor}`,
                    color: scoreColor,

                    fontFamily:
                      "'IBM Plex Mono', monospace",

                    fontSize: "8px",
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                  }}
                >
                  {scoreLabel}
                </div>
              </div>

              {/* SCORE BAR */}
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  background: "#ECEAE3",
                  marginTop: "18px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(
                      Math.max(score, 0),
                      100
                    )}%`,

                    background: scoreColor,

                    transition:
                      "width .8s cubic-bezier(.22,1,.36,1)",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",

                  marginTop: "7px",

                  fontFamily:
                    "'IBM Plex Mono', monospace",

                  fontSize: "7px",
                  color: "#A4A7AF",

                  textTransform: "uppercase",
                }}
              >
                <span>Needs work</span>
                <span>Strong match</span>
              </div>
            </div>

            {/* SUGGESTIONS */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <AlertTriangle
                  size={15}
                  color="#C63B26"
                />

                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'Newsreader', serif",
                    fontSize: "21px",
                    fontWeight: 500,
                    color: "#171B24",
                  }}
                >
                  Suggestions to improve
                </h3>
              </div>

              {feedback.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {feedback.map((item, index) => {
                    const cleanText = String(
                      item
                    ).replace(/\*\*/g, "");

                    const isImportant =
                      cleanText
                        .toLowerCase()
                        .includes("critical");

                    return (
                      <div
                        key={index}
                        style={{
                          padding: "13px 14px",

                          display: "flex",
                          gap: "12px",

                          border: isImportant
                            ? "1px solid #F0C8C2"
                            : "1px solid #DFDACC",

                          background: isImportant
                            ? "#FFF5F3"
                            : "#FFFFFF",

                          color: isImportant
                            ? "#A52E1C"
                            : "#536078",

                          fontSize: "12px",
                          lineHeight: 1.6,
                        }}
                      >
                        <span
                          style={{
                            minWidth: "24px",
                            color: isImportant
                              ? "#C63B26"
                              : "#9A9EAA",

                            fontFamily:
                              "'IBM Plex Mono', monospace",

                            fontSize: "9px",
                            fontWeight: 600,
                          }}
                        >
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span>{cleanText}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  style={{
                    padding: "16px",
                    border:
                      "1px solid #DFDACC",
                    background: "#FFFFFF",

                    color: "#5B6070",
                    fontSize: "12px",

                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <CheckCircle2
                    size={15}
                    color="#16A34A"
                  />

                  No major issues detected.
                </div>
              )}
            </div>

            {/* MISSING KEYWORDS */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <Search
                  size={15}
                  color="#C63B26"
                />

                <h3
                  style={{
                    margin: 0,
                    fontFamily:
                      "'Newsreader', serif",
                    fontSize: "21px",
                    fontWeight: 500,
                    color: "#171B24",
                  }}
                >
                  Missing keywords
                </h3>
              </div>

              {missingKeywords.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "7px",
                  }}
                >
                  {missingKeywords.map(
                    (keyword, index) => (
                      <span
                        key={index}
                        style={{
                          padding: "6px 9px",

                          background: "#F8EDEA",
                          border:
                            "1px solid #E8C9C2",

                          color: "#A52E1C",

                          fontFamily:
                            "'IBM Plex Mono', monospace",

                          fontSize: "8px",
                          textTransform:
                            "uppercase",

                          letterSpacing: ".03em",
                        }}
                      >
                        {keyword}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <div
                  style={{
                    padding: "14px",

                    border:
                      "1px solid #DFDACC",

                    background: "#FFFFFF",

                    color: "#5B6070",
                    fontSize: "12px",
                  }}
                >
                  No missing keywords detected.
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div
            style={{
              borderTop: "1px solid #DFDACC",

              padding: "12px 24px",

              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              background: "#F7F5EF",
            }}
          >
            <span
              style={{
                fontFamily:
                  "'IBM Plex Mono', monospace",

                fontSize: "7px",
                color: "#8A8F9B",

                textTransform: "uppercase",
                letterSpacing: ".06em",
              }}
            >
              ATS analysis
            </span>

            <button
              onClick={onClose}
              type="button"
              style={{
                border: "none",
                background: "transparent",

                color: "#5B6070",

                fontFamily:
                  "'IBM Plex Mono', monospace",

                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: ".05em",

                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );

  /*
    THIS IS THE IMPORTANT PART.
    The modal is rendered directly into BODY,
    NOT inside ResumeBuilder.
  */
  return createPortal(modal, document.body);
};

export default ATSModal;