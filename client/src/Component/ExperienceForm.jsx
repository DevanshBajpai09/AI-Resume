import {
  Briefcase,
  Plus,
  Sparkles,
  Trash2,
  Loader2,
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector(
    (state) => state.auth
  );

  const [generatingIndex, setGeneratingIndex] =
    useState(-1);

  const AddExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter(
      (_, i) => i !== index
    );

    onChange(updated);
  };

  const updateExperience = (
    index,
    field,
    value
  ) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  };

  const generatingDescription = async (index) => {
    setGeneratingIndex(index);

    const experience = data[index];

    const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`;

    try {
      const { data: responseData } =
        await api.post(
          "/api/ai/enhance-job-desc",
          {
            userContent: prompt,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      updateExperience(
        index,
        "description",
        responseData.enhanceContent
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message
      );
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div
      style={{
        background: "#FBFAF6",
        color: "#171B24",
        minHeight: "100%",
      }}
    >
      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div
        style={{
          paddingBottom: "20px",
          borderBottom:
            "1px solid #DFDACC",
        }}
      >
        <div
          style={{
            fontFamily:
              "'IBM Plex Mono', monospace",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            color: "#C63B26",
            marginBottom: "5px",
          }}
        >
          § 03 / Experience
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontFamily:
                  "'Newsreader', serif",
                fontSize: "27px",
                fontWeight: 500,
                color: "#171B24",
              }}
            >
              Professional Experience
            </h3>

            <p
              style={{
                margin: "5px 0 0",
                fontSize: "12px",
                color: "#5B6070",
                lineHeight: 1.5,
              }}
            >
              Show where you've worked,
              what you did, and the impact
              you made.
            </p>
          </div>

          {/* ADD EXPERIENCE */}

          <button
            type="button"
            onClick={AddExperience}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
              padding: "8px 11px",
              border: "1px solid #CFCBBC",
              background: "#FFFFFF",
              color: "#C63B26",
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "8px",
              textTransform: "uppercase",
              letterSpacing: ".04em",
              cursor: "pointer",
              transition: "all .2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "#F4EDE7";
              e.currentTarget.style.borderColor =
                "#C63B26";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "#FFFFFF";
              e.currentTarget.style.borderColor =
                "#CFCBBC";
            }}
          >
            <Plus size={13} />
            Add Experience
          </button>
        </div>
      </div>

      {/* ===================================== */}
      {/* EMPTY STATE */}
      {/* ===================================== */}

      {data.length === 0 ? (
        <div
          style={{
            padding: "55px 20px",
            textAlign: "center",
            borderBottom:
              "1px solid #DFDACC",
          }}
        >
          <Briefcase
            size={35}
            strokeWidth={1}
            color="#A7A49A"
            style={{
              margin: "0 auto 12px",
            }}
          />

          <p
            style={{
              margin: 0,
              fontFamily:
                "'Newsreader', serif",
              fontSize: "20px",
              color: "#171B24",
            }}
          >
            No experience yet
          </p>

          <p
            style={{
              margin:
                "5px 0 16px",
              fontSize: "11px",
              color: "#7A7E89",
            }}
          >
            Add your first professional
            experience to get started.
          </p>

          <button
            type="button"
            onClick={AddExperience}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding:
                "8px 12px",
              border:
                "1px solid #CFCBBC",
              background:
                "#FFFFFF",
              color:
                "#C63B26",
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "8px",
              textTransform:
                "uppercase",
              letterSpacing:
                ".04em",
              cursor:
                "pointer",
            }}
          >
            <Plus size={12} />
            Add Experience
          </button>
        </div>
      ) : (
        /* ===================================== */
        /* EXPERIENCE LIST */
        /* ===================================== */

        <div
          style={{
            paddingTop: "20px",
          }}
        >
          {data.map(
            (experience, index) => (
              <div
                key={index}
                style={{
                  marginBottom:
                    "20px",
                  border:
                    "1px solid #DFDACC",
                  background:
                    "#FFFFFF",
                }}
              >
                {/* EXPERIENCE HEADER */}

                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "space-between",
                    padding:
                      "12px 14px",
                    borderBottom:
                      "1px solid #DFDACC",
                    background:
                      "#F7F5EF",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: "9px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "'IBM Plex Mono', monospace",
                        fontSize: "9px",
                        color:
                          "#C63B26",
                      }}
                    >
                      0
                      {index + 1}
                    </span>

                    <span
                      style={{
                        fontFamily:
                          "'IBM Plex Mono', monospace",
                        fontSize: "9px",
                        textTransform:
                          "uppercase",
                        letterSpacing:
                          ".05em",
                        color:
                          "#5B6070",
                      }}
                    >
                      Experience
                    </span>
                  </div>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      removeExperience(
                        index
                      )
                    }
                    style={{
                      border: "none",
                      background:
                        "transparent",
                      color:
                        "#9A4B40",
                      cursor:
                        "pointer",
                      padding:
                        "4px",
                    }}
                    title="Remove experience"
                  >
                    <Trash2
                      size={14}
                    />
                  </button>
                </div>

                {/* EXPERIENCE BODY */}

                <div
                  style={{
                    padding: "15px",
                  }}
                >
                  {/* COMPANY + POSITION */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap: "12px",
                    }}
                  >
                    {/* COMPANY */}

                    <div>
                      <label
                        style={{
                          display:
                            "block",
                          marginBottom:
                            "6px",
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize: "8px",
                          textTransform:
                            "uppercase",
                          letterSpacing:
                            ".05em",
                          color:
                            "#5B6070",
                        }}
                      >
                        Company Name
                      </label>

                      <input
                        type="text"
                        value={
                          experience.company ||
                          ""
                        }
                        onChange={(e) =>
                          updateExperience(
                            index,
                            "company",
                            e.target
                              .value
                          )
                        }
                        placeholder="Company Name"
                        style={{
                          width: "100%",
                          height:
                            "40px",
                          boxSizing:
                            "border-box",
                          padding:
                            "0 11px",
                          border:
                            "1px solid #CFCBBC",
                          borderRadius:
                            "0",
                          outline:
                            "none",
                          background:
                            "#FFFFFF",
                          color:
                            "#171B24",
                          fontSize:
                            "12px",
                        }}
                      />
                    </div>

                    {/* POSITION */}

                    <div>
                      <label
                        style={{
                          display:
                            "block",
                          marginBottom:
                            "6px",
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize: "8px",
                          textTransform:
                            "uppercase",
                          letterSpacing:
                            ".05em",
                          color:
                            "#5B6070",
                        }}
                      >
                        Job Title
                      </label>

                      <input
                        type="text"
                        value={
                          experience.position ||
                          ""
                        }
                        onChange={(e) =>
                          updateExperience(
                            index,
                            "position",
                            e.target
                              .value
                          )
                        }
                        placeholder="Job title"
                        style={{
                          width: "100%",
                          height:
                            "40px",
                          boxSizing:
                            "border-box",
                          padding:
                            "0 11px",
                          border:
                            "1px solid #CFCBBC",
                          borderRadius:
                            "0",
                          outline:
                            "none",
                          background:
                            "#FFFFFF",
                          color:
                            "#171B24",
                          fontSize:
                            "12px",
                        }}
                      />
                    </div>
                  </div>

                  {/* DATES */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap: "12px",
                      marginTop:
                        "15px",
                    }}
                  >
                    {/* START */}

                    <div>
                      <label
                        style={{
                          display:
                            "block",
                          marginBottom:
                            "6px",
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize: "8px",
                          textTransform:
                            "uppercase",
                          letterSpacing:
                            ".05em",
                          color:
                            "#5B6070",
                        }}
                      >
                        Start Date
                      </label>

                      <input
                        type="month"
                        value={
                          experience.start_date ||
                          ""
                        }
                        onChange={(e) =>
                          updateExperience(
                            index,
                            "start_date",
                            e.target
                              .value
                          )
                        }
                        style={{
                          width: "100%",
                          height:
                            "40px",
                          boxSizing:
                            "border-box",
                          padding:
                            "0 11px",
                          border:
                            "1px solid #CFCBBC",
                          borderRadius:
                            "0",
                          outline:
                            "none",
                          background:
                            "#FFFFFF",
                          fontSize:
                            "12px",
                        }}
                      />
                    </div>

                    {/* END */}

                    <div>
                      <label
                        style={{
                          display:
                            "block",
                          marginBottom:
                            "6px",
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize: "8px",
                          textTransform:
                            "uppercase",
                          letterSpacing:
                            ".05em",
                          color:
                            "#5B6070",
                        }}
                      >
                        End Date
                      </label>

                      <input
                        type="month"
                        value={
                          experience.end_date ||
                          ""
                        }
                        disabled={
                          experience.is_current
                        }
                        onChange={(e) =>
                          updateExperience(
                            index,
                            "end_date",
                            e.target
                              .value
                          )
                        }
                        style={{
                          width: "100%",
                          height:
                            "40px",
                          boxSizing:
                            "border-box",
                          padding:
                            "0 11px",
                          border:
                            "1px solid #CFCBBC",
                          borderRadius:
                            "0",
                          outline:
                            "none",
                          background:
                            experience.is_current
                              ? "#F1EFE9"
                              : "#FFFFFF",
                          fontSize:
                            "12px",
                        }}
                      />
                    </div>
                  </div>

                  {/* CURRENT JOB */}

                  <label
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: "8px",
                      marginTop:
                        "13px",
                      cursor:
                        "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        experience.is_current ||
                        false
                      }
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "is_current",
                          e.target
                            .checked
                        )
                      }
                      style={{
                        accentColor:
                          "#C63B26",
                        width: "13px",
                        height: "13px",
                      }}
                    />

                    <span
                      style={{
                        fontSize:
                          "10px",
                        color:
                          "#5B6070",
                      }}
                    >
                      I currently work
                      here
                    </span>
                  </label>

                  {/* DIVIDER */}

                  <div
                    style={{
                      height: "1px",
                      background:
                        "#E5E2D9",
                      margin:
                        "17px 0",
                    }}
                  />

                  {/* DESCRIPTION */}

                  <div>
                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        marginBottom:
                          "7px",
                      }}
                    >
                      <label
                        style={{
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize: "8px",
                          textTransform:
                            "uppercase",
                          letterSpacing:
                            ".05em",
                          color:
                            "#5B6070",
                        }}
                      >
                        Job Description
                      </label>

                      {/* AI ENHANCE */}

                      <button
                        type="button"
                        onClick={() =>
                          generatingDescription(
                            index
                          )
                        }
                        disabled={
                          generatingIndex ===
                            index ||
                          !experience.position ||
                          !experience.company
                        }
                        style={{
                          display:
                            "inline-flex",
                          alignItems:
                            "center",
                          gap: "6px",
                          padding:
                            "6px 9px",
                          border:
                            "1px solid #D8B8AD",
                          background:
                            "#F4EDE7",
                          color:
                            "#C63B26",
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize: "8px",
                          textTransform:
                            "uppercase",
                          letterSpacing:
                            ".03em",
                          cursor:
                            "pointer",
                          opacity:
                            generatingIndex ===
                              index ||
                            !experience.position ||
                            !experience.company
                              ? 0.5
                              : 1,
                        }}
                      >
                        {generatingIndex ===
                        index ? (
                          <Loader2
                            size={11}
                            style={{
                              animation:
                                "spin 1s linear infinite",
                            }}
                          />
                        ) : (
                          <Sparkles
                            size={11}
                          />
                        )}

                        {generatingIndex ===
                        index
                          ? "Enhancing..."
                          : "AI Enhance"}
                      </button>
                    </div>

                    <textarea
                      value={
                        experience.description ||
                        ""
                      }
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "description",
                          e.target
                            .value
                        )
                      }
                      placeholder="Describe your key responsibilities and achievements..."
                      style={{
                        width: "100%",
                        minHeight:
                          "145px",
                        boxSizing:
                          "border-box",
                        padding:
                          "12px",
                        border:
                          "1px solid #CFCBBC",
                        borderRadius:
                          "0",
                        outline:
                          "none",
                        resize:
                          "vertical",
                        background:
                          "#FFFFFF",
                        color:
                          "#171B24",
                        fontSize:
                          "12px",
                        lineHeight:
                          1.65,
                        fontFamily:
                          "system-ui, sans-serif",
                      }}
                    />

                    <p
                      style={{
                        margin:
                          "6px 0 0",
                        fontSize:
                          "9px",
                        color:
                          "#8A8F9B",
                      }}
                    >
                      Tip: Focus on
                      achievements,
                      responsibilities,
                      and measurable
                      results.
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* ===================================== */}
      {/* INLINE ANIMATION */}
      {/* ===================================== */}

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ExperienceForm;