import {
  GraduationCap,
  Plus,
  Trash2,
} from "lucide-react";
import React from "react";

const EducationForm = ({ data, onChange }) => {

  const AddEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };

    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter(
      (_, i) => i !== index
    );

    onChange(updated);
  };

  const updateEducation = (
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
          § 04 / Education
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
              Education
            </h3>

            <p
              style={{
                margin: "5px 0 0",
                fontSize: "12px",
                color: "#5B6070",
                lineHeight: 1.5,
              }}
            >
              Add your academic background,
              degree, and qualifications.
            </p>

          </div>

          {/* ADD EDUCATION */}

          <button
            type="button"
            onClick={AddEducation}
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
            Add Education
          </button>

        </div>
      </div>

      {/* ================================= */}
      {/* EMPTY STATE */}
      {/* ================================= */}

      {data.length === 0 ? (

        <div
          style={{
            padding: "55px 20px",
            textAlign: "center",
            borderBottom:
              "1px solid #DFDACC",
          }}
        >

          <GraduationCap
            size={38}
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
            No education added
          </p>

          <p
            style={{
              margin:
                "5px 0 16px",
              fontSize: "11px",
              color: "#7A7E89",
            }}
          >
            Add your academic history
            to get started.
          </p>

          <button
            type="button"
            onClick={AddEducation}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
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
            Add Education
          </button>

        </div>

      ) : (

        /* ================================= */
        /* EDUCATION LIST */
        /* ================================= */

        <div
          style={{
            paddingTop: "20px",
          }}
        >

          {data.map(
            (education, index) => (

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

                {/* CARD HEADER */}

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
                      0{index + 1}
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
                      Education
                    </span>

                  </div>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      removeEducation(
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
                      padding: "4px",
                    }}
                    title="Remove education"
                  >
                    <Trash2 size={14} />
                  </button>

                </div>

                {/* CARD BODY */}

                <div
                  style={{
                    padding: "15px",
                  }}
                >

                  {/* INSTITUTION + DEGREE */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap: "12px",
                    }}
                  >

                    {/* INSTITUTION */}

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
                        Institute Name
                      </label>

                      <input
                        type="text"
                        value={
                          education.institution ||
                          ""
                        }
                        onChange={(e) =>
                          updateEducation(
                            index,
                            "institution",
                            e.target
                              .value
                          )
                        }
                        placeholder="Institute Name"
                        style={{
                          width: "100%",
                          height: "40px",
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

                    {/* DEGREE */}

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
                        Degree
                      </label>

                      <input
                        type="text"
                        value={
                          education.degree ||
                          ""
                        }
                        onChange={(e) =>
                          updateEducation(
                            index,
                            "degree",
                            e.target
                              .value
                          )
                        }
                        placeholder="Degree"
                        style={{
                          width: "100%",
                          height: "40px",
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

                  {/* FIELD + GRADUATION */}

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

                    {/* FIELD */}

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
                        Field of Study
                      </label>

                      <input
                        type="text"
                        value={
                          education.field ||
                          ""
                        }
                        onChange={(e) =>
                          updateEducation(
                            index,
                            "field",
                            e.target
                              .value
                          )
                        }
                        placeholder="Field of study"
                        style={{
                          width: "100%",
                          height: "40px",
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

                    {/* GRADUATION DATE */}

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
                        Graduation Date
                      </label>

                      <input
                        type="month"
                        value={
                          education.graduation_date ||
                          ""
                        }
                        onChange={(e) =>
                          updateEducation(
                            index,
                            "graduation_date",
                            e.target
                              .value
                          )
                        }
                        style={{
                          width: "100%",
                          height: "40px",
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

                  {/* GPA */}

                  <div
                    style={{
                      marginTop:
                        "15px",
                      maxWidth:
                        "50%",
                    }}
                  >

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
                      GPA
                    </label>

                    <input
                      type="number"
                      step="0.01"
                      value={
                        education.gpa ||
                        ""
                      }
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "gpa",
                          e.target.value
                        )
                      }
                      placeholder="GPA (Optional)"
                      style={{
                        width: "100%",
                        height: "40px",
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

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
};

export default EducationForm;