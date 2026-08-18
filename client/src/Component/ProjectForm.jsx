import {
  BookOpenIcon,
  Plus,
  Trash2,
} from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {

  const AddProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };

    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter(
      (_, i) => i !== index
    );

    onChange(updated);
  };

  const updateProject = (
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
          § 05 / Projects
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
              Projects
            </h3>

            <p
              style={{
                margin: "5px 0 0",
                fontSize: "12px",
                color: "#5B6070",
                lineHeight: 1.5,
              }}
            >
              Highlight the projects that
              demonstrate your skills and
              experience.
            </p>

          </div>

          {/* ADD PROJECT */}

          <button
            type="button"
            onClick={AddProject}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
              padding: "8px 11px",
              border:
                "1px solid #CFCBBC",
              background: "#FFFFFF",
              color: "#C63B26",
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "8px",
              textTransform:
                "uppercase",
              letterSpacing: ".04em",
              cursor: "pointer",
              transition:
                "all .2s ease",
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
            Add Project
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

          <BookOpenIcon
            size={38}
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
              fontSize: "20px",
              color: "#171B24",
            }}
          >
            No projects added
          </p>

          <p
            style={{
              margin:
                "5px 0 16px",
              fontSize: "11px",
              color: "#7A7E89",
            }}
          >
            Add your first project
            to get started.
          </p>

          <button
            type="button"
            onClick={AddProject}
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
            Add Project
          </button>

        </div>

      ) : (

        /* ================================= */
        /* PROJECT LIST */
        /* ================================= */

        <div
          style={{
            paddingTop: "20px",
          }}
        >

          {data.map(
            (project, index) => (

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
                      Project
                    </span>

                  </div>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      removeProject(
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
                    title="Remove project"
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

                  {/* NAME + TYPE */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap: "12px",
                    }}
                  >

                    {/* PROJECT NAME */}

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
                        Project Name
                      </label>

                      <input
                        type="text"
                        value={
                          project.name ||
                          ""
                        }
                        onChange={(e) =>
                          updateProject(
                            index,
                            "name",
                            e.target
                              .value
                          )
                        }
                        placeholder="Project Name"
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

                    {/* PROJECT TYPE */}

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
                        Project Type
                      </label>

                      <input
                        type="text"
                        value={
                          project.type ||
                          ""
                        }
                        onChange={(e) =>
                          updateProject(
                            index,
                            "type",
                            e.target
                              .value
                          )
                        }
                        placeholder="Project Type"
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

                    <label
                      style={{
                        display:
                          "block",
                        marginBottom:
                          "7px",
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
                      Project Description
                    </label>

                    <textarea
                      rows={6}
                      value={
                        project.description ||
                        ""
                      }
                      onChange={(e) =>
                        updateProject(
                          index,
                          "description",
                          e.target
                            .value
                        )
                      }
                      placeholder="Describe your project, what you built, the technologies you used, and the impact it had..."
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
                      Tip: Mention the
                      technologies used,
                      what you built, and
                      measurable results.
                    </p>

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

export default ProjectForm;