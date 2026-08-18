import { Plus, Sparkles, X } from "lucide-react";
import React, { useState } from "react";

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const AddSkill = () => {
    if (
      newSkill.trim() &&
      !data.includes(newSkill.trim())
    ) {
      onChange([
        ...data,
        newSkill.trim(),
      ]);

      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(
      data.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      AddSkill();
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

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

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
          § 06 / Skills
        </div>

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
          Skills
        </h3>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: "12px",
            color: "#5B6070",
            lineHeight: 1.5,
          }}
        >
          Add the technical and soft skills
          that best represent your strengths.
        </p>

      </div>

      {/* ================================= */}
      {/* ADD SKILL */}
      {/* ================================= */}

      <div
        style={{
          paddingTop: "20px",
        }}
      >

        <label
          style={{
            display: "block",
            marginBottom: "7px",
            fontFamily:
              "'IBM Plex Mono', monospace",
            fontSize: "8px",
            textTransform: "uppercase",
            letterSpacing: ".05em",
            color: "#5B6070",
          }}
        >
          Add a skill
        </label>

        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >

          <input
            type="text"
            placeholder="e.g. JavaScript, React, Leadership"
            value={newSkill}
            onChange={(e) =>
              setNewSkill(e.target.value)
            }
            onKeyDown={handleKeyPress}
            style={{
              flex: 1,
              height: "40px",
              boxSizing: "border-box",
              padding: "0 11px",
              border:
                "1px solid #CFCBBC",
              borderRadius: "0",
              outline: "none",
              background: "#FFFFFF",
              color: "#171B24",
              fontSize: "12px",
            }}
          />

          <button
            type="button"
            onClick={AddSkill}
            disabled={!newSkill.trim()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              height: "40px",
              padding: "0 14px",
              border:
                "1px solid #C63B26",
              background:
                newSkill.trim()
                  ? "#C63B26"
                  : "#D8D5CC",
              color: "#FFFFFF",
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "8px",
              textTransform: "uppercase",
              letterSpacing: ".04em",
              cursor: newSkill.trim()
                ? "pointer"
                : "not-allowed",
              transition:
                "all .2s ease",
            }}
          >
            <Plus size={13} />
            Add
          </button>

        </div>

      </div>

      {/* ================================= */}
      {/* SKILLS */}
      {/* ================================= */}

      {data.length > 0 ? (

        <div
          style={{
            marginTop: "22px",
            borderTop:
              "1px solid #DFDACC",
            paddingTop: "18px",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >

            <span
              style={{
                fontFamily:
                  "'IBM Plex Mono', monospace",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: ".06em",
                color: "#5B6070",
              }}
            >
              Added Skills
            </span>

            <span
              style={{
                fontFamily:
                  "'IBM Plex Mono', monospace",
                fontSize: "8px",
                color: "#C63B26",
              }}
            >
              {data.length}{" "}
              {data.length === 1
                ? "skill"
                : "skills"}
            </span>

          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >

            {data.map(
              (skill, index) => (

                <div
                  key={index}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding:
                      "7px 9px 7px 11px",
                    border:
                      "1px solid #CFCBBC",
                    background:
                      "#FFFFFF",
                    color: "#171B24",
                    fontSize: "11px",
                    transition:
                      "all .2s ease",
                  }}
                >

                  <span>
                    {skill}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removeSkill(index)
                    }
                    style={{
                      display:
                        "inline-flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      width: "18px",
                      height: "18px",
                      border: "none",
                      background:
                        "transparent",
                      color:
                        "#8A8F9B",
                      cursor:
                        "pointer",
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color =
                        "#C63B26";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        "#8A8F9B";
                    }}
                    title={`Remove ${skill}`}
                  >
                    <X size={12} />
                  </button>

                </div>

              )
            )}

          </div>

        </div>

      ) : (

        /* ================================= */
        /* EMPTY STATE */
        /* ================================= */

        <div
          style={{
            marginTop: "25px",
            padding:
              "40px 20px",
            textAlign: "center",
            border:
              "1px solid #DFDACC",
            background:
              "#FFFFFF",
          }}
        >

          <Sparkles
            size={34}
            strokeWidth={1}
            color="#A7A49A"
            style={{
              margin:
                "0 auto 12px",
            }}
          />

          <p
            style={{
              margin: 0,
              fontFamily:
                "'Newsreader', serif",
              fontSize: "19px",
              color:
                "#171B24",
            }}
          >
            No skills added yet
          </p>

          <p
            style={{
              margin:
                "5px 0 0",
              fontSize: "11px",
              color:
                "#7A7E89",
            }}
          >
            Add your technical and
            soft skills above.
          </p>

        </div>

      )}

      {/* ================================= */}
      {/* TIP */}
      {/* ================================= */}

      <div
        style={{
          marginTop: "18px",
          padding: "12px 14px",
          borderLeft:
            "2px solid #C63B26",
          background:
            "#F4EDE7",
        }}
      >

        <p
          style={{
            margin: 0,
            fontSize: "10px",
            color: "#5B6070",
            lineHeight: 1.6,
          }}
        >
          <strong
            style={{
              color: "#171B24",
            }}
          >
            Tip:
          </strong>{" "}
          Add 8–12 relevant skills. Include
          technical skills such as programming
          languages and tools, along with
          soft skills such as leadership and
          communication.
        </p>

      </div>

    </div>
  );
};

export default SkillsForm;