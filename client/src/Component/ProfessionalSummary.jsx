import { Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummary = ({
  data,
  onChange,
  setResumeData,
}) => {
  const { token } = useSelector(
    (state) => state.auth
  );

  const [isGenerating, setIsGenerating] =
    useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);

      const prompt = `enhance my professional summary "${data}"`;

      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        {
          userContent: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumeData((prev) => ({
        ...prev,
        professional_summary:
          response.data.enhanceContent,
      }));
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message
      );
    } finally {
      setIsGenerating(false);
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
          § 02 / Profile
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent:
              "space-between",
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
              Professional Summary
            </h3>

            <p
              style={{
                margin:
                  "5px 0 0",
                fontSize: "12px",
                color: "#5B6070",
                lineHeight: 1.5,
              }}
            >
              Introduce yourself with a
              concise professional profile.
            </p>
          </div>

          {/* AI BUTTON */}

          <button
            type="button"
            disabled={isGenerating}
            onClick={generateSummary}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              flexShrink: 0,
              padding:
                "8px 11px",
              border:
                "1px solid #D8B8AD",
              background:
                isGenerating
                  ? "#F4EDE7"
                  : "#FFFFFF",
              color: "#C63B26",
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "8px",
              textTransform:
                "uppercase",
              letterSpacing:
                ".04em",
              cursor: isGenerating
                ? "not-allowed"
                : "pointer",
              opacity:
                isGenerating
                  ? 0.7
                  : 1,
              transition:
                "all .2s ease",
            }}
          >
            {isGenerating ? (
              <Loader2
                size={13}
                style={{
                  animation:
                    "spin 1s linear infinite",
                }}
              />
            ) : (
              <Sparkles size={13} />
            )}

            {isGenerating
              ? "Enhancing..."
              : "AI Enhance"}
          </button>
        </div>
      </div>

      {/* ===================================== */}
      {/* SUMMARY EDITOR */}
      {/* ===================================== */}

      <div
        style={{
          paddingTop: "20px",
        }}
      >
        <label
          htmlFor="professional-summary"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            marginBottom: "7px",
            fontFamily:
              "'IBM Plex Mono', monospace",
            fontSize: "8px",
            textTransform:
              "uppercase",
            letterSpacing:
              ".05em",
            color: "#5B6070",
          }}
        >
          <span>Your summary</span>

          <span
            style={{
              color: "#8A8F9B",
              textTransform:
                "none",
              letterSpacing: 0,
              fontFamily:
                "system-ui, sans-serif",
              fontSize: "9px",
            }}
          >
            3–4 sentences
          </span>
        </label>

        <textarea
          id="professional-summary"
          value={data || ""}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
          style={{
            width: "100%",
            minHeight: "190px",
            boxSizing:
              "border-box",
            padding: "13px",
            border:
              "1px solid #CFCBBC",
            borderRadius: "0px",
            background:
              "#FFFFFF",
            color: "#171B24",
            outline: "none",
            resize: "vertical",
            fontSize: "12px",
            lineHeight: 1.7,
            fontFamily:
              "system-ui, sans-serif",
            transition:
              "border-color .15s ease, box-shadow .15s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor =
              "#C63B26";

            e.target.style.boxShadow =
              "0 0 0 2px rgba(198,59,38,.08)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor =
              "#CFCBBC";

            e.target.style.boxShadow =
              "none";
          }}
        />

        {/* ===================================== */}
        {/* TIP */}
        {/* ===================================== */}

        <div
          style={{
            marginTop: "12px",
            padding:
              "11px 13px",
            background:
              "#F4EDE7",
            borderLeft:
              "2px solid #C63B26",
          }}
        >
          <div
            style={{
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "8px",
              color:
                "#8B4A32",
              textTransform:
                "uppercase",
              letterSpacing:
                ".05em",
            }}
          >
            Editor's note
          </div>

          <p
            style={{
              margin:
                "4px 0 0",
              fontSize: "10px",
              lineHeight: 1.5,
              color:
                "#5B6070",
            }}
          >
            Keep this section concise.
            Focus on your experience,
            strongest skills, and the
            type of value you bring.
          </p>
        </div>
      </div>

      {/* INLINE SPIN ANIMATION */}

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

export default ProfessionalSummary;