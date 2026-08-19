import {
  FilePenLineIcon,
  PencilIcon,
  Plus,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
  LoaderCircleIcon,
  FileText,
  ArrowUpRight,
} from "lucide-react";

import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import DashboardSkeleton from "../Component/skeleton/DashboardSkeleton";
import Navbar from "../Component/Navbar";

const Dashboard = () => {
  const [allresumes, setallResumes] =
    useState([]);
    const [editPdfModal, setEditPdfModal] = useState(false);
const [pdfFile, setPdfFile] = useState(null);
const [pdfName, setPdfName] = useState("");

  const [CreateResume, setCreateResume] =
    useState(false);

  const [uploadresume, setUploadresume] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [resume, setResume] =
    useState(null);

  const [editResumeId, setEditResumeId] =
    useState("");

  const [isLoading, setisLoading] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deleteResumeId, setDeleteResumeId] =
    useState(null);

  const { token } =
    useSelector((state) => state.auth);

  const { loading } =
    useSelector((state) => state.auth);

  const isOnline =
    useSelector(
      (state) =>
        state.network.isOnline
    );

  const navigate = useNavigate();
 /* ========================================= */
  /* EditPDF */
  /* ========================================= */

  const handleEditPdf = (e) => {
  e.preventDefault();

  if (!pdfFile) {
    toast.error("Please select a PDF");
    return;
  }

  const pdfId = crypto.randomUUID();

  setEditPdfModal(false);
  setPdfName("");
  setPdfFile(null);

  navigate(`/app/edit-pdf/${pdfId}`);
};

  /* ========================================= */
  /* LOAD RESUMES */
  /* ========================================= */

  const loadallResumes = async () => {
    try {
      const { data } =
        await api.get(
          "/api/users/resumes",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setallResumes(data.resumes);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message
      );
    }
  };

  /* ========================================= */
  /* CREATE RESUME */
  /* ========================================= */

  const Createresume = async (e) => {
    try {
      e.preventDefault();

      const { data } =
        await api.post(
          "/api/resumes/create",
          { title },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setallResumes([
        ...allresumes,
        data.resume,
      ]);

      setTitle("");
      setCreateResume(false);

      navigate(
        `/app/builder/${data.resume._id}`
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message
      );
    }
  };

  /* ========================================= */
  /* UPLOAD RESUME */
  /* ========================================= */

  const UploadResume = async (e) => {
    e.preventDefault();

    setisLoading(true);

    try {
      const resumeText =
        await pdfToText(resume);

      const { data } =
        await api.post(
          "/api/ai/upload-resume",
          {
            title,
            resumeText,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setTitle("");
      setResume(null);
      setUploadresume(false);

      navigate(
        `/app/builder/${data.resumeId}`
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message
      );
    } finally {
      setisLoading(false);
    }
  };

  /* ========================================= */
  /* EDIT RESUME */
  /* ========================================= */

  const EditResume = async (e) => {
    try {
      e.preventDefault();

      const { data } =
        await api.put(
          `/api/resumes/update`,
          {
            resumeId:
              editResumeId,
            resumeData: {
              title,
            },
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setallResumes(
        allresumes.map((resume) =>
          resume._id === editResumeId
            ? {
                ...resume,
                title,
              }
            : resume
        )
      );

      setTitle("");
      setEditResumeId("");

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message
      );
    }
  };

  /* ========================================= */
  /* DELETE RESUME */
  /* ========================================= */

  const DeleteResume = async () => {
    try {
      const { data } =
        await api.delete(
          `/api/resumes/delete/${deleteResumeId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setallResumes((prev) =>
        prev.filter(
          (resume) =>
            resume._id !==
            deleteResumeId
        )
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message
      );
    } finally {
      setShowDeleteModal(false);
      setDeleteResumeId(null);
    }
  };

  /* ========================================= */
  /* INITIAL LOAD */
  /* ========================================= */

  useEffect(() => {
    loadallResumes();

    // eslint-disable-next-line
  }, []);

  if (loading || !isOnline) {
    return <DashboardSkeleton />;
  }

  /* ========================================= */
  /* UI */
  /* ========================================= */

  return (
    <>
   
    <Navbar/>
    <div
      style={{
        minHeight: "100vh",
        background: "#FBFAF6",
        color: "#171B24",
      }}
    >
      <main
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          padding:
            "45px clamp(20px, 4vw, 60px) 80px",
        }}
      >
        {/* ===================================== */}
        {/* PAGE HEADER */}
        {/* ===================================== */}

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent:
              "space-between",
            gap: "30px",
            marginBottom: "40px",
            borderBottom:
              "1px solid #DFDACC",
            paddingBottom: "25px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily:
                  "'IBM Plex Mono', monospace",
                fontSize: "9px",
                color: "#C63B26",
                textTransform:
                  "uppercase",
                letterSpacing:
                  ".12em",
                marginBottom: "8px",
              }}
            >
              Workspace
            </div>

            <h1
              style={{
                fontFamily:
                  "'Newsreader', serif",
                fontSize:
                  "clamp(38px, 5vw, 58px)",
                lineHeight: 0.95,
                fontWeight: 500,
                margin: 0,
                letterSpacing:
                  "-.025em",
              }}
            >
              Your resumes.
            </h1>

            <p
              style={{
                marginTop: "14px",
                color: "#5B6070",
                fontSize: "13px",
                maxWidth: "520px",
                lineHeight: 1.6,
              }}
            >
              Build, edit and tailor your
              resumes from one workspace.
              Keep every version ready for
              the next opportunity.
            </p>
          </div>

          <div
            style={{
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "9px",
              color: "#8A8F9B",
              textTransform:
                "uppercase",
              letterSpacing:
                ".08em",
              whiteSpace: "nowrap",
            }}
          >
            {allresumes.length}{" "}
            {allresumes.length === 1
              ? "resume"
              : "resumes"}
          </div>
        </div>

        {/* ===================================== */}
        {/* QUICK ACTIONS */}
        {/* ===================================== */}

        <section
          style={{
            marginBottom: "45px",
          }}
        >
          <div
            style={{
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "8px",
              color: "#8A8F9B",
              textTransform:
                "uppercase",
              letterSpacing:
                ".1em",
              marginBottom: "12px",
            }}
          >
            Start something new
          </div>

          <div
            className="dashboard-actions"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "12px",
              maxWidth: "760px",
            }}
          >
            {/* CREATE */}
            <button
              type="button"
              onClick={() =>
                setCreateResume(true)
              }
              style={{
                background: "#171B24",
                color: "#FFFFFF",
                border:
                  "1px solid #171B24",
                minHeight: "145px",
                padding: "22px",
                textAlign: "left",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              className="dashboard-action"
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  border:
                    "1px solid rgba(255,255,255,.2)",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  marginBottom: "20px",
                }}
              >
                <Plus
                  size={17}
                  strokeWidth={1.5}
                />
              </div>

              <div
                style={{
                  fontFamily:
                    "'Newsreader', serif",
                  fontSize: "24px",
                  fontWeight: 500,
                }}
              >
                Create Resume
              </div>

              <div
                style={{
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  color:
                    "rgba(255,255,255,.55)",
                  textTransform:
                    "uppercase",
                  marginTop: "5px",
                  letterSpacing:
                    ".05em",
                }}
              >
                Start from scratch
              </div>

              <ArrowUpRight
                size={17}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "20px",
                  opacity: 0.6,
                }}
              />
            </button>

            {/* UPLOAD */}
            <button
              type="button"
              onClick={() =>
                setUploadresume(true)
              }
              style={{
                background: "#FFFFFF",
                color: "#171B24",
                border:
                  "1px solid #DFDACC",
                minHeight: "145px",
                padding: "22px",
                textAlign: "left",
                cursor: "pointer",
                position: "relative",
              }}
              className="dashboard-action"
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  border:
                    "1px solid #DFDACC",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  marginBottom: "20px",
                  color: "#C63B26",
                }}
              >
                <UploadCloudIcon
                  size={17}
                  strokeWidth={1.5}
                />
              </div>

              <div
                style={{
                  fontFamily:
                    "'Newsreader', serif",
                  fontSize: "24px",
                  fontWeight: 500,
                }}
              >
                Upload Existing
              </div>

              <div
                style={{
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  color: "#8A8F9B",
                  textTransform:
                    "uppercase",
                  marginTop: "5px",
                  letterSpacing:
                    ".05em",
                }}
              >
                Let AI extract your resume
              </div>

              <ArrowUpRight
                size={17}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "20px",
                  color: "#8A8F9B",
                }}
              />
            </button>
            {/* EDIT PDF */}
<button
  type="button"
  onClick={() => setEditPdfModal(true)}
  style={{
    background: "#FFFFFF",
    color: "#171B24",
    border: "1px solid #DFDACC",
    minHeight: "145px",
    padding: "22px",
    textAlign: "left",
    cursor: "pointer",
    position: "relative",
  }}
  className="dashboard-action"
>
  <div
    style={{
      width: "35px",
      height: "35px",
      border: "1px solid #DFDACC",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
      color: "#C63B26",
    }}
  >
    <FilePenLineIcon
      size={17}
      strokeWidth={1.5}
    />
  </div>

  <div
    style={{
      fontFamily: "'Newsreader', serif",
      fontSize: "24px",
      fontWeight: 500,
    }}
  >
    Edit PDF
  </div>

  <div
    style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: "8px",
      color: "#8A8F9B",
      textTransform: "uppercase",
      marginTop: "5px",
      letterSpacing: ".05em",
    }}
  >
    Edit your PDF directly
  </div>

  <ArrowUpRight
    size={17}
    style={{
      position: "absolute",
      right: "20px",
      top: "20px",
      color: "#8A8F9B",
    }}
  />
</button>
          </div>
        </section>

        {/* ===================================== */}
        {/* RESUME LIST */}
        {/* ===================================== */}

        <section>
          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
              borderTop:
                "1px solid #DFDACC",
              paddingTop: "17px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontFamily:
                  "'IBM Plex Mono', monospace",
                fontSize: "9px",
                color: "#5B6070",
                textTransform:
                  "uppercase",
                letterSpacing:
                  ".09em",
              }}
            >
              Saved documents
            </div>

            <div
              style={{
                fontFamily:
                  "'IBM Plex Mono', monospace",
                fontSize: "8px",
                color: "#9A9DA6",
              }}
            >
              {allresumes.length
                ? "RECENT FIRST"
                : "NO DOCUMENTS"}
            </div>
          </div>

          {allresumes.length === 0 ? (
            <div
              style={{
                border:
                  "1px dashed #D5D1C6",
                minHeight: "220px",
                display: "flex",
                flexDirection:
                  "column",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                textAlign: "center",
                color: "#8A8F9B",
              }}
            >
              <FileText
                size={28}
                strokeWidth={1}
                style={{
                  marginBottom: "12px",
                }}
              />

              <div
                style={{
                  fontFamily:
                    "'Newsreader', serif",
                  fontSize: "21px",
                  color: "#5B6070",
                }}
              >
                No resumes yet.
              </div>

              <p
                style={{
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                Create your first resume
                above.
              </p>
            </div>
          ) : (
            <div
              className="resume-grid"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4, minmax(0, 1fr))",
                gap: "14px",
              }}
            >
              {allresumes.map(
                (resume, index) => {
                  return (
                    <article
                      key={resume._id}
                      style={{
                        position:
                          "relative",
                        minHeight: "235px",
                        background:
                          "#FFFFFF",
                        border:
                          "1px solid #DFDACC",
                        cursor:
                          "pointer",
                        transition:
                          "border-color .2s ease, transform .2s ease",
                      }}
                      className="resume-card"
                      onClick={() =>
                        navigate(
                          `/app/builder/${resume._id}`
                        )
                      }
                    >
                      {/* CARD NUMBER */}
                      <div
                        style={{
                          position:
                            "absolute",
                          top: "13px",
                          left: "14px",
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize: "8px",
                          color:
                            "#9A9DA6",
                        }}
                      >
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </div>

                      {/* EDIT / DELETE */}
                      <div
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                        style={{
                          position:
                            "absolute",
                          top: "8px",
                          right: "8px",
                          display: "flex",
                          gap: "2px",
                        }}
                        className="card-actions"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setEditResumeId(
                              resume._id
                            );
                            setTitle(
                              resume.title
                            );
                          }}
                          style={{
                            width: "29px",
                            height: "29px",
                            border:
                              "1px solid #DFDACC",
                            background:
                              "#FBFAF6",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            cursor:
                              "pointer",
                            color:
                              "#5B6070",
                          }}
                        >
                          <PencilIcon
                            size={13}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setDeleteResumeId(
                              resume._id
                            );
                            setShowDeleteModal(
                              true
                            );
                          }}
                          style={{
                            width: "29px",
                            height: "29px",
                            border:
                              "1px solid #DFDACC",
                            background:
                              "#FBFAF6",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            cursor:
                              "pointer",
                            color:
                              "#C63B26",
                          }}
                        >
                          <TrashIcon
                            size={13}
                          />
                        </button>
                      </div>

                      {/* DOCUMENT ICON */}
                      <div
                        style={{
                          position:
                            "absolute",
                          left: "20px",
                          bottom: "57px",
                          width: "45px",
                          height: "56px",
                          border:
                            "1px solid #D8D4C9",
                          background:
                            "#FBFAF6",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                        }}
                      >
                        <FilePenLineIcon
                          size={19}
                          strokeWidth={1.2}
                          color="#C63B26"
                        />
                      </div>

                      {/* TITLE */}
                      <div
                        style={{
                          position:
                            "absolute",
                          left: "20px",
                          right: "15px",
                          bottom: "27px",
                        }}
                      >
                        <div
                          style={{
                            fontFamily:
                              "'Newsreader', serif",
                            fontSize: "20px",
                            fontWeight: 500,
                            color:
                              "#171B24",
                            overflow:
                              "hidden",
                            textOverflow:
                              "ellipsis",
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          {resume.title}
                        </div>
                      </div>

                      {/* DATE */}
                      <div
                        style={{
                          position:
                            "absolute",
                          left: "20px",
                          bottom: "10px",
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize: "7px",
                          color:
                            "#9A9DA6",
                          textTransform:
                            "uppercase",
                        }}
                      >
                        Updated{" "}
                        {new Date(
                          resume.updatedAt
                        ).toLocaleDateString()}
                      </div>

                      {/* OPEN */}
                      <ArrowUpRight
                        size={15}
                        style={{
                          position:
                            "absolute",
                          right: "17px",
                          bottom: "14px",
                          color:
                            "#B3B0A7",
                        }}
                      />
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>
      </main>

      {/* ========================================= */}
      {/* CREATE RESUME MODAL */}
      {/* ========================================= */}

      {CreateResume && (
        <div
          onClick={() => {
            setCreateResume(false);
            setTitle("");
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{
            background:
              "rgba(23,27,36,.55)",
            backdropFilter:
              "blur(5px)",
          }}
        >
          <form
            onSubmit={Createresume}
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "430px",
              background:
                "#FBFAF6",
              border:
                "1px solid #DFDACC",
            }}
          >
            <div
              style={{
                padding:
                  "17px 20px",
                borderBottom:
                  "1px solid #DFDACC",
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "8px",
                    color: "#C63B26",
                    textTransform:
                      "uppercase",
                    letterSpacing:
                      ".08em",
                  }}
                >
                  New document
                </div>

                <h2
                  style={{
                    fontFamily:
                      "'Newsreader', serif",
                    fontSize: "25px",
                    fontWeight: 500,
                    margin:
                      "3px 0 0",
                  }}
                >
                  Create Resume
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCreateResume(
                    false
                  );
                  setTitle("");
                }}
                style={{
                  width: "29px",
                  height: "29px",
                  border:
                    "1px solid #DFDACC",
                  background:
                    "transparent",
                  cursor:
                    "pointer",
                  color:
                    "#5B6070",
                }}
              >
                <XIcon size={14} />
              </button>
            </div>

            <div
              style={{
                padding: "22px",
              }}
            >
              <label
                style={{
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  color: "#5B6070",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    ".07em",
                }}
              >
                Resume title
              </label>

              <input
                autoFocus
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                placeholder="e.g. Software Engineer"
                required
                style={{
                  width: "100%",
                  height: "45px",
                  marginTop: "8px",
                  padding:
                    "0 13px",
                  border:
                    "1px solid #CFCBC0",
                  background:
                    "#FFFFFF",
                  outline: "none",
                  fontSize: "13px",
                  color:
                    "#171B24",
                }}
              />

              <button
                type="submit"
                style={{
                  width: "100%",
                  height: "43px",
                  marginTop: "14px",
                  background:
                    "#171B24",
                  border:
                    "1px solid #171B24",
                  color:
                    "#FFFFFF",
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    ".08em",
                  cursor:
                    "pointer",
                }}
              >
                Create document
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================= */}
      {/* UPLOAD RESUME MODAL */}
      {/* ========================================= */}

      {uploadresume && (
        <div
          onClick={() => {
            setUploadresume(false);
            setTitle("");
            setResume(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{
            background:
              "rgba(23,27,36,.55)",
            backdropFilter:
              "blur(5px)",
          }}
        >
          <form
            onSubmit={UploadResume}
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "450px",
              background:
                "#FBFAF6",
              border:
                "1px solid #DFDACC",
            }}
          >
            <div
              style={{
                padding:
                  "17px 20px",
                borderBottom:
                  "1px solid #DFDACC",
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "8px",
                    color: "#C63B26",
                    textTransform:
                      "uppercase",
                    letterSpacing:
                      ".08em",
                  }}
                >
                  AI import
                </div>

                <h2
                  style={{
                    fontFamily:
                      "'Newsreader', serif",
                    fontSize: "25px",
                    fontWeight: 500,
                    margin:
                      "3px 0 0",
                  }}
                >
                  Upload Resume
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUploadresume(
                    false
                  );
                  setTitle("");
                  setResume(null);
                }}
                style={{
                  width: "29px",
                  height: "29px",
                  border:
                    "1px solid #DFDACC",
                  background:
                    "transparent",
                  cursor:
                    "pointer",
                  color:
                    "#5B6070",
                }}
              >
                <XIcon size={14} />
              </button>
            </div>

            <div
              style={{
                padding: "22px",
              }}
            >
              <label
                style={{
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  color: "#5B6070",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    ".07em",
                }}
              >
                Resume title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                placeholder="e.g. My Software Resume"
                required
                style={{
                  width: "100%",
                  height: "45px",
                  marginTop: "8px",
                  padding:
                    "0 13px",
                  border:
                    "1px solid #CFCBC0",
                  background:
                    "#FFFFFF",
                  outline: "none",
                  fontSize: "13px",
                }}
              />

              <label
                htmlFor="resume-input"
                style={{
                  display: "block",
                  marginTop: "17px",
                  border:
                    "1px dashed #CFCBC0",
                  background:
                    "#FFFFFF",
                  minHeight: "150px",
                  cursor:
                    "pointer",
                }}
              >
                <div
                  style={{
                    height:
                      "150px",
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    gap: "8px",
                    color:
                      resume
                        ? "#2D7A50"
                        : "#8A8F9B",
                  }}
                >
                  {resume ? (
                    <>
                      <FileText
                        size={28}
                        strokeWidth={1.2}
                      />

                      <p
                        style={{
                          margin: 0,
                          fontSize:
                            "12px",
                          maxWidth:
                            "90%",
                          overflow:
                            "hidden",
                          textOverflow:
                            "ellipsis",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {resume.name}
                      </p>

                      <span
                        style={{
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize:
                            "7px",
                          textTransform:
                            "uppercase",
                        }}
                      >
                        PDF selected
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud
                        size={29}
                        strokeWidth={1}
                      />

                      <p
                        style={{
                          margin: 0,
                          fontFamily:
                            "'Newsreader', serif",
                          fontSize:
                            "20px",
                          color:
                            "#5B6070",
                        }}
                      >
                        Choose your PDF
                      </p>

                      <span
                        style={{
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize:
                            "7px",
                          color:
                            "#9A9DA6",
                          textTransform:
                            "uppercase",
                        }}
                      >
                        AI will extract your information
                      </span>
                    </>
                  )}
                </div>
              </label>

              <input
                type="file"
                id="resume-input"
                accept=".pdf"
                onChange={(e) =>
                  setResume(
                    e.target.files[0]
                  )
                }
                hidden
              />

              <button
                disabled={isLoading}
                type="submit"
                style={{
                  width: "100%",
                  height: "43px",
                  marginTop: "14px",
                  background:
                    isLoading
                      ? "#555B66"
                      : "#171B24",
                  border:
                    "1px solid #171B24",
                  color:
                    "#FFFFFF",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  gap: "8px",
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    ".08em",
                  cursor:
                    isLoading
                      ? "default"
                      : "pointer",
                }}
              >
                {isLoading && (
                  <LoaderCircleIcon
                    className="animate-spin"
                    size={14}
                  />
                )}

                {isLoading
                  ? "Importing..."
                  : "Import resume"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================= */}
{/* EDIT PDF MODAL */}
{/* ========================================= */}

{editPdfModal && (
  <div
    onClick={() => {
      setEditPdfModal(false);
      setPdfName("");
      setPdfFile(null);
    }}
    className="fixed inset-0 z-50 flex items-center justify-center p-5"
    style={{
      background: "rgba(23,27,36,.55)",
      backdropFilter: "blur(5px)",
    }}
  >
    <form
      onSubmit={(e) => {
        handleEditPdf(e)
        e.preventDefault();

        if (!pdfFile) {
          toast.error("Please select a PDF");
          return;
        }

        // Later we'll connect this to the PDF editor backend
        console.log({
          name: pdfName,
          file: pdfFile,
        });

        // Example:
        // navigate("/app/pdf-editor");

      }}
       
  onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%",
        maxWidth: "450px",
        background: "#FBFAF6",
        border: "1px solid #DFDACC",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "17px 20px",
          borderBottom: "1px solid #DFDACC",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "8px",
              color: "#C63B26",
              textTransform: "uppercase",
              letterSpacing: ".08em",
            }}
          >
            PDF editor
          </div>

          <h2
            style={{
              fontFamily: "'Newsreader', serif",
              fontSize: "25px",
              fontWeight: 500,
              margin: "3px 0 0",
            }}
          >
            Edit PDF
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditPdfModal(false);
            setPdfName("");
            setPdfFile(null);
          }}
          style={{
            width: "29px",
            height: "29px",
            border: "1px solid #DFDACC",
            background: "transparent",
            cursor: "pointer",
            color: "#5B6070",
          }}
        >
          <XIcon size={14} />
        </button>
      </div>

      {/* BODY */}
      <div
        style={{
          padding: "22px",
        }}
      >
        {/* PDF NAME */}
        <label
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "8px",
            color: "#5B6070",
            textTransform: "uppercase",
            letterSpacing: ".07em",
          }}
        >
          PDF name
        </label>

        <input
          autoFocus
          type="text"
          value={pdfName}
          onChange={(e) => setPdfName(e.target.value)}
          placeholder="e.g. My Resume"
          required
          style={{
            width: "100%",
            height: "45px",
            marginTop: "8px",
            padding: "0 13px",
            border: "1px solid #CFCBC0",
            background: "#FFFFFF",
            outline: "none",
            fontSize: "13px",
            color: "#171B24",
          }}
        />

        {/* PDF UPLOAD */}
        <label
          htmlFor="edit-pdf-input"
          style={{
            display: "block",
            marginTop: "17px",
            border: "1px dashed #CFCBC0",
            background: "#FFFFFF",
            minHeight: "150px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              minHeight: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: pdfFile ? "#2D7A50" : "#8A8F9B",
              padding: "20px",
              textAlign: "center",
            }}
          >
            {pdfFile ? (
              <>
                <FileText
                  size={28}
                  strokeWidth={1.2}
                />

                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    maxWidth: "90%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {pdfFile.name}
                </p>

                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "7px",
                    textTransform: "uppercase",
                  }}
                >
                  PDF selected
                </span>
              </>
            ) : (
              <>
                <UploadCloud
                  size={29}
                  strokeWidth={1}
                />

                <p
                  style={{
                    margin: 0,
                    fontFamily: "'Newsreader', serif",
                    fontSize: "20px",
                    color: "#5B6070",
                  }}
                >
                  Choose your PDF
                </p>

                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "7px",
                    color: "#9A9DA6",
                    textTransform: "uppercase",
                  }}
                >
                  Upload a PDF to start editing
                </span>
              </>
            )}
          </div>
        </label>

        <input
          id="edit-pdf-input"
          type="file"
          accept="application/pdf,.pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            if (file.type !== "application/pdf") {
              toast.error("Please select a PDF file");
              return;
            }

            setPdfFile(file);
          }}
          hidden
        />

        {/* CONTINUE */}
        <button
          type="submit"
          style={{
            width: "100%",
            height: "43px",
            marginTop: "14px",
            background: "#171B24",
            border: "1px solid #171B24",
            color: "#FFFFFF",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "8px",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            cursor: "pointer",
          }}
        >
          Continue to editor
        </button>
      </div>
    </form>
  </div>
)}

      {/* ========================================= */}
      {/* EDIT TITLE MODAL */}
      {/* ========================================= */}

      {editResumeId && (
        <div
          onClick={() => {
            setEditResumeId("");
            setTitle("");
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{
            background:
              "rgba(23,27,36,.55)",
            backdropFilter:
              "blur(5px)",
          }}
        >
          <form
            onSubmit={EditResume}
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "430px",
              background:
                "#FBFAF6",
              border:
                "1px solid #DFDACC",
            }}
          >
            <div
              style={{
                padding:
                  "17px 20px",
                borderBottom:
                  "1px solid #DFDACC",
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "8px",
                    color: "#C63B26",
                    textTransform:
                      "uppercase",
                  }}
                >
                  Document settings
                </div>

                <h2
                  style={{
                    fontFamily:
                      "'Newsreader', serif",
                    fontSize: "25px",
                    fontWeight: 500,
                    margin:
                      "3px 0 0",
                  }}
                >
                  Rename Resume
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditResumeId(
                    ""
                  );
                  setTitle("");
                }}
                style={{
                  width: "29px",
                  height: "29px",
                  border:
                    "1px solid #DFDACC",
                  background:
                    "transparent",
                  cursor:
                    "pointer",
                }}
              >
                <XIcon size={14} />
              </button>
            </div>

            <div
              style={{
                padding: "22px",
              }}
            >
              <input
                autoFocus
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                required
                style={{
                  width: "100%",
                  height: "45px",
                  padding:
                    "0 13px",
                  border:
                    "1px solid #CFCBC0",
                  background:
                    "#FFFFFF",
                  outline: "none",
                  fontSize: "13px",
                }}
              />

              <button
                type="submit"
                style={{
                  width: "100%",
                  height: "43px",
                  marginTop: "14px",
                  background:
                    "#171B24",
                  color:
                    "#FFFFFF",
                  border:
                    "1px solid #171B24",
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    ".08em",
                  cursor:
                    "pointer",
                }}
              >
                Save title
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================= */}
      {/* DELETE MODAL */}
      {/* ========================================= */}

      {showDeleteModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-5"
          style={{
            background:
              "rgba(23,27,36,.55)",
            backdropFilter:
              "blur(5px)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "390px",
              background:
                "#FBFAF6",
              border:
                "1px solid #DFDACC",
            }}
          >
            <div
              style={{
                padding:
                  "18px 20px",
                borderBottom:
                  "1px solid #DFDACC",
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
                  letterSpacing:
                    ".08em",
                }}
              >
                Permanent action
              </div>

              <h3
                style={{
                  fontFamily:
                    "'Newsreader', serif",
                  fontSize: "25px",
                  fontWeight: 500,
                  margin:
                    "4px 0 0",
                }}
              >
                Delete Resume?
              </h3>
            </div>

            <div
              style={{
                padding: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#5B6070",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                This will permanently
                remove this resume and
                its saved information.
                This action cannot be
                undone.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "flex-end",
                  gap: "8px",
                  marginTop: "22px",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowDeleteModal(
                      false
                    )
                  }
                  style={{
                    height: "38px",
                    padding:
                      "0 16px",
                    border:
                      "1px solid #DFDACC",
                    background:
                      "transparent",
                    color:
                      "#5B6070",
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "8px",
                    textTransform:
                      "uppercase",
                    cursor:
                      "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    DeleteResume
                  }
                  style={{
                    height: "38px",
                    padding:
                      "0 16px",
                    border:
                      "1px solid #C63B26",
                    background:
                      "#C63B26",
                    color:
                      "#FFFFFF",
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "8px",
                    textTransform:
                      "uppercase",
                    cursor:
                      "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* RESPONSIVE / HOVER */}
      {/* ========================================= */}

      <style>{`
        .dashboard-action {
          transition:
            transform .2s ease,
            border-color .2s ease,
            box-shadow .2s ease;
        }

        .dashboard-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(23,27,36,.08);
        }

        .resume-card:hover {
          border-color: #BDB8AC !important;
          transform: translateY(-2px);
        }

        .card-actions {
          opacity: 0;
          transition: opacity .2s ease;
        }

        .resume-card:hover .card-actions {
          opacity: 1;
        }
          @media (max-width: 1000px) {
  .dashboard-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

        @media (max-width: 900px) {
          .resume-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 650px) {
          .dashboard-actions {
    grid-template-columns: 1fr !important;
  }

          .resume-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 430px) {
          .resume-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
     </>
  );
};

export default Dashboard;