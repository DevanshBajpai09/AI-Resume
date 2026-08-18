import {
  Check,
  Palette,
} from "lucide-react";
import React from "react";

const ColorPicker = ({
  onChange,
  selectedColor,
  openMenu,
  setOpenMenu,
}) => {
  const colors = [
    {
      name: "Blue",
      value: "#3B82F6",
    },
    {
      name: "Red",
      value: "#EF4444",
    },
    {
      name: "Green",
      value: "#10B981",
    },
    {
      name: "Yellow",
      value: "#F59E0B",
    },
    {
      name: "Purple",
      value: "#8B5CF6",
    },
    {
      name: "Pink",
      value: "#EC4899",
    },
    {
      name: "Indigo",
      value: "#6366F1",
    },
    {
      name: "Gray",
      value: "#6B7280",
    },
    {
      name: "Black",
      value: "#000000",
    },
    {
      name: "Teal",
      value: "#14B8A6",
    },
    {
      name: "Orange",
      value: "#F97316",
    },
    {
      name: "Cyan",
      value: "#06B6D4",
    },
  ];

  const isOpen = openMenu === "color";

  const selected =
    colors.find(
      (color) =>
        color.value === selectedColor
    ) || colors[0];

  return (
    <div
      style={{
        position: "relative",
      }}
    >

      {/* ================================================= */}
      {/* ACCENT BUTTON */}
      {/* ================================================= */}

      <button
        type="button"
        onClick={() =>
          setOpenMenu(
            isOpen ? null : "color"
          )
        }
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          padding: "8px 12px",
          background: "#FBFAF6",
          border:
            "1px solid #DFDACC",
          color: "#171B24",
          cursor: "pointer",
          fontFamily:
            "'IBM Plex Mono', monospace",
          fontSize: "9px",
          textTransform: "uppercase",
          letterSpacing: ".04em",
          transition:
            "all .15s ease",
        }}
      >
        <Palette
          size={14}
          strokeWidth={1.5}
        />

        <span className="accent-button-text">
          Accent
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

      {/* ================================================= */}
      {/* OVERLAY + DROPDOWN */}
      {/* ================================================= */}

      {isOpen && (
        <>
          {/* Overlay */}

          <div
            onClick={() =>
              setOpenMenu(null)
            }
            style={{
              position: "fixed",
              inset: 0,
              
              zIndex: 40,
            }}
          />

          {/* Dropdown */}

          <div
            style={{
              position: "absolute",
              top:
                "calc(100% + 10px)",
              left: 0,
              width:
                "min(350px, calc(100vw - 30px))",
              background:
                "#FBFAF6",
              border:
                "1px solid #CFCBBC",
              boxShadow:
                "0 18px 40px rgba(23,27,36,.12)",
              zIndex: 50,
              overflow: "hidden",
            }}
          >

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div
              style={{
                padding:
                  "14px 16px",
                borderBottom:
                  "1px solid #DFDACC",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
              }}
            >
              <div>

                <div
                  style={{
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "9px",
                    color:
                      "#5B6070",
                    textTransform:
                      "uppercase",
                    letterSpacing:
                      ".08em",
                  }}
                >
                  Accent
                </div>

                <div
                  style={{
                    fontFamily:
                      "'Newsreader', serif",
                    fontSize: "18px",
                    marginTop: "3px",
                  }}
                >
                  Choose a color
                </div>

              </div>

              {/* Current color */}

              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "7px",
                }}
              >
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius:
                      "50%",
                    backgroundColor:
                      selected.value,
                    border:
                      "1px solid rgba(0,0,0,.12)",
                  }}
                />

                <span
                  style={{
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "8px",
                    color:
                      "#8A8F9B",
                    textTransform:
                      "uppercase",
                  }}
                >
                  {selected.name}
                </span>
              </div>
            </div>

            {/* ================================================= */}
            {/* COLORS */}
            {/* ================================================= */}

            <div
              style={{
                padding: "15px",
                display: "grid",
                gridTemplateColumns:
                  "repeat(4, 1fr)",
                gap: "10px",
              }}
            >
              {colors.map(
                (color) => {
                  const isSelected =
                    selectedColor ===
                    color.value;

                  return (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => {
                        onChange(
                          color.value
                        );

                        setOpenMenu(
                          null
                        );
                      }}
                      style={{
                        position:
                          "relative",
                        border: "none",
                        background:
                          "transparent",
                        cursor:
                          "pointer",
                        padding: "5px",
                        textAlign:
                          "center",
                      }}
                    >

                      {/* Color circle */}

                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius:
                            "50%",
                          backgroundColor:
                            color.value,
                          margin:
                            "0 auto",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          border:
                            isSelected
                              ? "2px solid #171B24"
                              : "2px solid transparent",
                          boxShadow:
                            "0 0 0 1px rgba(0,0,0,.08)",
                          transition:
                            "all .15s ease",
                        }}
                      >

                        {isSelected && (
                          <span
                            style={{
                              width: "23px",
                              height: "23px",
                              borderRadius:
                                "50%",
                              background:
                                "rgba(0,0,0,.25)",
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                            }}
                          >
                            <Check
                              size={13}
                              color="#fff"
                              strokeWidth={2.5}
                            />
                          </span>
                        )}

                      </div>

                      {/* Name */}

                      <div
                        style={{
                          marginTop:
                            "6px",
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize: "8px",
                          color:
                            isSelected
                              ? "#171B24"
                              : "#5B6070",
                          textTransform:
                            "uppercase",
                          letterSpacing:
                            ".02em",
                        }}
                      >
                        {color.name}
                      </div>

                    </button>
                  );
                }
              )}
            </div>

            {/* ================================================= */}
            {/* FOOTER */}
            {/* ================================================= */}

            <div
              style={{
                borderTop:
                  "1px solid #DFDACC",
                padding:
                  "10px 15px",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
              }}
            >
              <span
                style={{
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  color:
                    "#8A8F9B",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    ".06em",
                }}
              >
                Live accent
              </span>

              <span
                style={{
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  color:
                    "#5B6070",
                }}
              >
                {selected.value}
              </span>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default ColorPicker;