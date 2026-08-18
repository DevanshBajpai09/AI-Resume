import {
  CheckIcon,
  Layout,
  LockIcon,
  ArrowUpRight,
} from "lucide-react";
import React from "react";
import { PREMIUM_TEMPLATES } from "../configs/template";
import api from "../configs/api";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const TemplateSelector = ({
  selectedTemplate,
  onChange,
  openMenu,
  setOpenMenu,
}) => {
  const isOpen = openMenu === "template";

  const { token, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const Template = [
    {
      id: "modern",
      name: "Modern",
      preview:
        "A sleek, contemporary design with bold headings and ample white space.",
    },
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume layout with clear sections and a professional look.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview:
        "A simple, elegant design focusing on content with minimal distractions.",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview:
        "A clean, minimal design with an image placeholder.",
    },
    {
      id: "futuristic",
      name: "Futuristic",
      preview:
        "Dark theme with glass morphism effects, gradient backgrounds, and animated elements.",
    },
    {
      id: "creative",
      name: "Creative",
      preview:
        "Asymmetric layout with bold color blocks, timeline design, and organic shapes.",
    },
    {
      id: "elegant",
      name: "Elegant",
      preview:
        "Professional layout with sophisticated typography, subtle gradients, and refined spacing.",
    },
  ];

  // ==========================================
  // PREMIUM PAYMENT
  // ==========================================

  const handlePremiumPayment = async () => {
    try {
      const { data } = await api.post(
        "/api/payment/create-order",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,

        name: "Resume Builder",
        description: "Unlock Premium Templates",

        handler: async (response) => {
          try {
            await api.post(
              "/api/payment/verify",
              response,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            toast.success("Premium Unlocked 🎉");

            dispatch({
              type: "auth/setUser",
              payload: {
                ...user,
                isPremium: true,
              },
            });

            // Close template menu after payment
            setOpenMenu(null);
          } catch (error) {
            toast.error(
              error?.response?.data?.message ||
                "Payment verification failed"
            );
          }
        },

        theme: {
          color: "#C63B26",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (error) {
      if (
        error?.response?.data?.message ===
        "User already has premium access"
      ) {
        toast.success("You already have premium access");
        return;
      }

      toast.error(
        error?.response?.data?.message ||
          "Payment failed"
      );
    }
  };

  // ==========================================
  // TEMPLATE SELECT
  // ==========================================

  const handleTemplateClick = (template) => {
    const isLocked =
      PREMIUM_TEMPLATES.includes(template.id) &&
      !user?.isPremium;

    if (isLocked) {
      handlePremiumPayment();
      return;
    }

    onChange(template.id);

    // Close menu
    setOpenMenu(null);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >

        {/* ================================= */}
        {/* TEMPLATE BUTTON */}
        {/* ================================= */}

        <button
          type="button"
          onClick={() =>
            setOpenMenu(
              isOpen ? null : "template"
            )
          }
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "8px 12px",
            background: "#FBFAF6",
            border: "1px solid #DFDACC",
            color: "#171B24",
            cursor: "pointer",
            fontFamily:
              "'IBM Plex Mono', monospace",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: ".04em",
            transition: "all .15s ease",
          }}
        >
          <Layout
            size={14}
            strokeWidth={1.5}
          />

          <span className="template-label">
            Template
          </span>

          <span
            style={{
              color: "#A4A7AF",
              fontSize: "10px",
              transform: isOpen
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition:
                "transform .2s ease",
            }}
          >
            ↓
          </span>
        </button>

        {/* ================================= */}
        {/* OVERLAY + DROPDOWN */}
        {/* ================================= */}

        {isOpen && (
          <>
            {/* Overlay */}
            <div
              onClick={() => setOpenMenu(null)}
              style={{
                position: "fixed",
                inset: 0,
                
                zIndex: 90,
              }}
            />

            {/* ================================= */}
            {/* DROPDOWN */}
            {/* ================================= */}

            <div
              style={{
                position: "absolute",
                top: "calc(100% + 9px)",
                left: 0,
                width:
                  "min(350px, calc(100vw - 30px))",
                maxHeight: "470px",
                overflowY: "auto",
                padding: "8px",
                background: "#FBFAF6",
                border:
                  "1px solid #DFDACC",
                boxShadow:
                  "0 20px 45px rgba(23,27,36,.12)",
                zIndex: 100,
              }}
            >

              {/* Dropdown header */}

              <div
                style={{
                  padding:
                    "10px 10px 13px",
                  borderBottom:
                    "1px solid #DFDACC",
                  marginBottom: "7px",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "8px",
                    color: "#C63B26",
                    textTransform:
                      "uppercase",
                    letterSpacing: ".08em",
                  }}
                >
                  Choose your layout
                </div>

                <div
                  style={{
                    fontFamily:
                      "'Newsreader', serif",
                    fontSize: "20px",
                    marginTop: "3px",
                    color: "#171B24",
                  }}
                >
                  Resume templates
                </div>
              </div>

              {/* ================================= */}
              {/* TEMPLATES */}
              {/* ================================= */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {Template.map(
                  (template, index) => {
                    const isLocked =
                      PREMIUM_TEMPLATES.includes(
                        template.id
                      ) &&
                      !user?.isPremium;

                    const isSelected =
                      selectedTemplate ===
                      template.id;

                    return (
                      <div
                        key={template.id}
                        onClick={() =>
                          handleTemplateClick(
                            template
                          )
                        }
                        style={{
                          position:
                            "relative",
                          padding: "13px",
                          border: isSelected
                            ? "1px solid #C63B26"
                            : "1px solid #DFDACC",
                          background:
                            isSelected
                              ? "#F8EDEA"
                              : "#FFFFFF",
                          cursor: "pointer",
                          transition:
                            "all .18s ease",
                          opacity: isLocked
                            ? 0.75
                            : 1,
                        }}
                        className="template-card"
                      >

                        {/* Number */}

                        <div
                          style={{
                            display: "flex",
                            alignItems:
                              "flex-start",
                            gap: "11px",
                          }}
                        >
                          <div
                            style={{
                              minWidth: "24px",
                              fontFamily:
                                "'IBM Plex Mono', monospace",
                              fontSize: "8px",
                              color: "#A4A7AF",
                              paddingTop: "3px",
                            }}
                          >
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </div>

                          {/* Content */}

                          <div
                            style={{
                              flex: 1,
                              minWidth: 0,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "space-between",
                                gap: "8px",
                              }}
                            >
                              <h4
                                style={{
                                  margin: 0,
                                  fontFamily:
                                    "'Newsreader', serif",
                                  fontSize: "19px",
                                  fontWeight: 500,
                                  color:
                                    "#171B24",
                                }}
                              >
                                {template.name}
                              </h4>

                              {/* Selected */}

                              {isSelected &&
                                !isLocked && (
                                  <div
                                    style={{
                                      width: "21px",
                                      height: "21px",
                                      borderRadius:
                                        "50%",
                                      background:
                                        "#C63B26",
                                      display:
                                        "flex",
                                      alignItems:
                                        "center",
                                      justifyContent:
                                        "center",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <CheckIcon
                                      size={12}
                                      color="white"
                                    />
                                  </div>
                                )}

                              {/* Premium */}

                              {isLocked && (
                                <div
                                  style={{
                                    display:
                                      "flex",
                                    alignItems:
                                      "center",
                                    gap: "4px",
                                    padding:
                                      "4px 6px",
                                    background:
                                      "#171B24",
                                    color:
                                      "#FFFFFF",
                                    fontFamily:
                                      "'IBM Plex Mono', monospace",
                                    fontSize: "7px",
                                    textTransform:
                                      "uppercase",
                                    letterSpacing:
                                      ".05em",
                                  }}
                                >
                                  <LockIcon
                                    size={10}
                                  />

                                  PRO
                                </div>
                              )}
                            </div>

                            <p
                              style={{
                                margin:
                                  "5px 0 0",
                                color:
                                  "#5B6070",
                                fontFamily:
                                  "system-ui, sans-serif",
                                fontSize: "11px",
                                lineHeight: 1.5,
                                maxWidth:
                                  "270px",
                              }}
                            >
                              {template.preview}
                            </p>

                            {/* Selected label */}

                            {isSelected &&
                              !isLocked && (
                                <div
                                  style={{
                                    marginTop:
                                      "8px",
                                    fontFamily:
                                      "'IBM Plex Mono', monospace",
                                    fontSize: "7px",
                                    color:
                                      "#C63B26",
                                    textTransform:
                                      "uppercase",
                                    letterSpacing:
                                      ".06em",
                                  }}
                                >
                                  Currently selected
                                </div>
                              )}

                            {/* Premium CTA */}

                            {isLocked && (
                              <div
                                style={{
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  gap: "4px",
                                  marginTop:
                                    "8px",
                                  fontFamily:
                                    "'IBM Plex Mono', monospace",
                                  fontSize: "7px",
                                  color:
                                    "#C63B26",
                                  textTransform:
                                    "uppercase",
                                  letterSpacing:
                                    ".05em",
                                }}
                              >
                                Unlock premium
                                <ArrowUpRight
                                  size={10}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* ================================= */}
              {/* PREMIUM FOOTER */}
              {/* ================================= */}

              {!user?.isPremium && (
                <div
                  style={{
                    marginTop: "8px",
                    padding: "11px",
                    borderTop:
                      "1px solid #DFDACC",
                    background:
                      "#F4EDE7",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        "'IBM Plex Mono', monospace",
                      fontSize: "7px",
                      color: "#8B4A32",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        ".06em",
                    }}
                  >
                    Premium access
                  </div>

                  <p
                    style={{
                      margin:
                        "3px 0 0",
                      fontSize: "10px",
                      lineHeight: 1.4,
                      color: "#5B6070",
                    }}
                  >
                    Unlock all premium
                    resume layouts with
                    one purchase.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style>{`
        .template-card:hover {
          border-color: #C8C2B5 !important;
          background: #F7F5EF !important;
          transform: translateX(2px);
        }

        @media (max-width: 500px) {
          .template-label {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default TemplateSelector;