import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Copy,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  Globe,
  GraduationCap,
  QrCode,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";

import PersonalInfo from "../Component/PersonalInfo";
import ResumePreview from "../Component/ResumePreview";
import TemplateSelector from "../Component/TemplateSelector";
import ColorPicker from "../Component/ColorPicker";
import ProfessionalSummary from "../Component/ProfessionalSummary";
import ExperienceForm from "../Component/ExperienceForm";
import EducationForm from "../Component/EducationForm";
import ProjectForm from "../Component/ProjectForm";
import SkillsForm from "../Component/SkillsForm";

import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";

import ResumeBuilderSkeleton from "../Component/skeleton/ResumeBuilderSkeleton";
import QRCode from "react-qr-code";
import ATSModal from "../Component/ATSModal";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const resumeRef = useRef(null);
  const shareRef = useRef(null);

  const { token } = useSelector((state) => state.auth);

  const { loading: authLoading } = useSelector(
    (state) => state.auth
  );

  const isOnline = useSelector(
    (state) => state.network.isOnline
  );

  // ---------------------------------------------
  // STATES
  // ---------------------------------------------

  const [pageLoading, setPageLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  const [showShareMenu, setShowShareMenu] =
    useState(false);

  const [showQR, setShowQR] = useState(false);

  const [showATS, setShowATS] = useState(false);

  const [activeSectionIndex, setActiveSectionIndex] =
    useState(0);

  const [removeBackground, setRemoveBackground] =
    useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const [isDirty, setIsDirty] = useState(false);

  const [lastSaved, setLastSaved] = useState(null);

  const [resumedata, setresumeData] = useState({
    _id: "",
    title: "",
    personal_info: {
      full_name: "",
      profession: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      image: "",
    },
    professionalInfo: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const portfolioUrl =
    window.location.origin +
    "/portfolio/" +
    resumeId;

  // ---------------------------------------------
  // LOAD RESUME
  // ---------------------------------------------

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(
        "/api/resumes/get/" + resumeId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.resume) {
        setresumeData(data.resume);

        document.title =
          data.resume.title || "Resume Builder";

        // Important:
        // Don't autosave immediately after loading.
        setIsDirty(false);

        setLastSaved(new Date());
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message
      );
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !resumeId) return;

    loadExistingResume();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, resumeId]);

  // ---------------------------------------------
  // AUTO SAVE
  // ---------------------------------------------

  useEffect(() => {
    if (!isDirty) return;
    if (!resumedata?._id) return;
    if (!token) return;
    if (!isOnline) return;

    const timer = setTimeout(async () => {
      await autoSaveResume();
    }, 1000);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumedata, isDirty]);

  // ---------------------------------------------
  // AUTO SAVE FUNCTION
  // ---------------------------------------------

  const autoSaveResume = async () => {
    if (!resumedata?._id) return;

    try {
      setIsSaving(true);

      let updatedResumeData =
        structuredClone(resumedata);

      // Don't send File object inside JSON
      if (
        updatedResumeData.personal_info &&
        typeof updatedResumeData.personal_info.image ===
          "object"
      ) {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();

      formData.append(
        "resumeId",
        resumeId
      );

      formData.append(
        "resumeData",
        JSON.stringify(updatedResumeData)
      );

      // Background removal
      if (removeBackground) {
        formData.append(
          "removeBackground",
          "yes"
        );
      }

      // Upload image only when it is a new File
      if (
        resumedata.personal_info &&
        typeof resumedata.personal_info.image ===
          "object"
      ) {
        formData.append(
          "image",
          resumedata.personal_info.image
        );
      }

      const { data } = await api.put(
        "/api/resumes/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.resume) {
        setresumeData(data.resume);
      }

      setIsDirty(false);
      setLastSaved(new Date());
    } catch (error) {
      console.error(
        "AUTO SAVE ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Could not autosave resume"
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ---------------------------------------------
  // UPDATE RESUME DATA
  // ---------------------------------------------

  const updateResumeData = (updater) => {
    setresumeData((prev) => {
      const updated =
        typeof updater === "function"
          ? updater(prev)
          : updater;

      return updated;
    });

    setIsDirty(true);
  };

  // ---------------------------------------------
  // CLOSE SHARE MENU
  // ---------------------------------------------

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareRef.current &&
        !shareRef.current.contains(
          event.target
        )
      ) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // ---------------------------------------------
  // SECTIONS
  // ---------------------------------------------

  const sections = [
    {
      id: "personal",
      title: "Personal Info",
      icon: User,
    },
    {
      id: "Summary",
      title: "Summary",
      icon: FileText,
    },
    {
      id: "Experience",
      title: "Experience",
      icon: Briefcase,
    },
    {
      id: "Education",
      title: "Education",
      icon: GraduationCap,
    },
    {
      id: "Projects",
      title: "Projects",
      icon: FolderIcon,
    },
    {
      id: "Skills",
      title: "Skills",
      icon: Sparkles,
    },
  ];

  const activeSection =
    sections[activeSectionIndex];

  // ---------------------------------------------
  // VISIBILITY
  // ---------------------------------------------

  const changeResumeVisibility = async () => {
    try {
      const newVisibility =
        !resumedata.public;

      updateResumeData((prev) => ({
        ...prev,
        public: newVisibility,
      }));

      const formData = new FormData();

      formData.append(
        "resumeId",
        resumeId
      );

      formData.append(
        "resumeData",
        JSON.stringify({
          public: newVisibility,
        })
      );

      const { data } = await api.put(
        "/api/resumes/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.resume) {
        setresumeData(data.resume);
      }

      setIsDirty(false);

      toast.success(
        newVisibility
          ? "Resume is now public"
          : "Resume is now private"
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message
      );
    }
  };

  // ---------------------------------------------
  // DOWNLOAD
  // ---------------------------------------------

  const downloadResume =
    useReactToPrint({
      contentRef: resumeRef,
      documentTitle:
        resumedata.title ||
        "Resume",
    });

  // ---------------------------------------------
  // SECTION REORDER
  // ---------------------------------------------

  const handleReorder = async (
    newOrder
  ) => {
    updateResumeData((prev) => ({
      ...prev,
      sectionOrder: newOrder,
    }));

    try {
      await api.put(
        "/api/resumes/section-order",
        {
          resumeId,
          sectionOrder: newOrder,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error(
        "Section reorder error:",
        err
      );
    }
  };

  // ---------------------------------------------
  // NAVIGATION
  // ---------------------------------------------

  const previousSection = () => {
    setActiveSectionIndex(
      (prev) => Math.max(prev - 1, 0)
    );
  };

  const nextSection = () => {
    setActiveSectionIndex(
      (prev) =>
        Math.min(
          prev + 1,
          sections.length - 1
        )
    );
  };

  // ---------------------------------------------
  // SHARE
  // ---------------------------------------------

  const copyResumeLink = () => {
    const url =
      window.location.origin +
      "/view/" +
      resumeId;

    navigator.clipboard.writeText(url);

    toast.success(
      "Resume link copied"
    );

    setShowShareMenu(false);
  };

  const copyPortfolioLink = () => {
    const url =
      window.location.origin +
      "/portfolio/" +
      resumeId;

    navigator.clipboard.writeText(url);

    toast.success(
      "Portfolio link copied"
    );

    setShowShareMenu(false);
  };

  // ---------------------------------------------
  // LOADING
  // ---------------------------------------------

  if (
    authLoading ||
    !isOnline ||
    pageLoading
  ) {
    return <ResumeBuilderSkeleton />;
  }

  // ---------------------------------------------
  // AUTOSAVE STATUS
  // ---------------------------------------------

  const autosaveText = isSaving
    ? "Saving..."
    : "Autosaved";

  // ---------------------------------------------
  // UI
  // ---------------------------------------------

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FBFAF6",
        color: "#171B24",
      }}
    >
      {/* ================================================= */}
      {/* TOP HEADER */}
      {/* ================================================= */}

      <header
        style={{
          minHeight: "68px",
          borderBottom:
            "1px solid #DFDACC",
          background: "#FBFAF6",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          padding:
            "12px clamp(16px, 4vw, 60px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          gap: "15px",
        }}
      >
        {/* LEFT */}
        <Link
          to="/app"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#5B6070",
            textDecoration: "none",
            fontFamily:
              "'IBM Plex Mono', monospace",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: ".06em",
            flexShrink: 0,
          }}
        >
          <ArrowLeftIcon size={14} />
          Dashboard
        </Link>

        {/* CENTER */}
        <div
          style={{
            textAlign: "center",
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "8px",
              color: "#C63B26",
              textTransform: "uppercase",
              letterSpacing: ".12em",
            }}
          >
            Resume editor
          </div>

          <div
            style={{
              fontFamily:
                "'Newsreader', serif",
              fontSize: "18px",
              fontWeight: 500,
              color: "#171B24",
              marginTop: "2px",
              maxWidth: "260px",
              overflow: "hidden",
              textOverflow:
                "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {resumedata.title ||
              "Untitled Resume"}
          </div>
        </div>

        {/* RIGHT AUTOSAVE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            fontFamily:
              "'IBM Plex Mono', monospace",
            fontSize: "8px",
            color: isSaving
              ? "#A16D13"
              : "#4E8A62",
            textTransform:
              "uppercase",
            letterSpacing: ".05em",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background:
                isSaving
                  ? "#C89428"
                  : "#4E8A62",
              display: "inline-block",
            }}
          />

          {autosaveText}
        </div>
      </header>

      {/* ================================================= */}
      {/* TOP ACTION BAR */}
      {/* ================================================= */}

      <div
        style={{
          position: "sticky",
          top: "68px",
          zIndex: 40,
          background:
            "rgba(251,250,246,.96)",
          backdropFilter:
            "blur(10px)",
          borderBottom:
            "1px solid #DFDACC",
          padding:
            "10px clamp(16px, 4vw, 60px)",
        }}
      >
        <div
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {/* LEFT ACTIONS */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              flexWrap: "wrap",
            }}
          >
            <TemplateSelector
  openMenu={openMenu}
  setOpenMenu={setOpenMenu}
  selectedTemplate={resumedata.template}
  onChange={(template) =>
    updateResumeData((prev) => ({
      ...prev,
      template,
    }))
  }
/>

<ColorPicker
  openMenu={openMenu}
  setOpenMenu={setOpenMenu}
  selectedColor={resumedata.accent_color}
  onChange={(color) =>
    updateResumeData((prev) => ({
      ...prev,
      accent_color: color,
    }))
  }
/>
          </div>

          {/* RIGHT ACTIONS */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              flexWrap: "wrap",
            }}
          >
            {/* ATS */}

            <button
              type="button"
              onClick={() =>
                setShowATS(true)
              }
              style={{
                height: "36px",
                padding: "0 12px",
                border:
                  "1px solid #DFDACC",
                background:
                  "#FFFFFF",
                color: "#5B6070",
                display: "flex",
                alignItems:
                  "center",
                gap: "5px",
                fontFamily:
                  "'IBM Plex Mono', monospace",
                fontSize: "8px",
                textTransform:
                  "uppercase",
                cursor: "pointer",
              }}
            >
              ATS

              <span
                style={{
                  color: "#C63B26",
                  fontWeight: 600,
                }}
              >
                {resumedata.atsScore ||
                  0}
                %
              </span>
            </button>

            {/* ATS MODAL */}

            {showATS && (
              <ATSModal
                resume={resumedata}
                onClose={() =>
                  setShowATS(false)
                }
              />
            )}

            {/* SHARE */}

            {resumedata.public && (
              <div
                ref={shareRef}
                style={{
                  position: "relative",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowShareMenu(
                      (prev) => !prev
                    )
                  }
                  style={{
                    height: "36px",
                    padding:
                      "0 12px",
                    border:
                      "1px solid #DFDACC",
                    background:
                      "#FFFFFF",
                    color:
                      "#5B6070",
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "6px",
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "8px",
                    textTransform:
                      "uppercase",
                    cursor:
                      "pointer",
                  }}
                >
                  <Share2Icon
                    size={13}
                  />
                  Share
                </button>

                {showShareMenu && (
                  <div
                    style={{
                      position:
                        "absolute",
                      right: 0,
                      top:
                        "calc(100% + 8px)",
                      width: "210px",
                      background:
                        "#FFFFFF",
                      border:
                        "1px solid #DFDACC",
                      boxShadow:
                        "0 10px 30px rgba(0,0,0,.08)",
                      zIndex: 100,
                    }}
                  >
                    <button
                      type="button"
                      onClick={
                        copyResumeLink
                      }
                      style={{
                        width: "100%",
                        padding: "12px",
                        border:
                          "none",
                        borderBottom:
                          "1px solid #DFDACC",
                        background:
                          "#FFFFFF",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: "9px",
                        color:
                          "#5B6070",
                        fontSize:
                          "11px",
                        textAlign:
                          "left",
                        cursor:
                          "pointer",
                      }}
                    >
                      <FileText
                        size={13}
                      />

                      Resume Link

                      <Copy
                        size={11}
                        style={{
                          marginLeft:
                            "auto",
                        }}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={
                        copyPortfolioLink
                      }
                      style={{
                        width: "100%",
                        padding: "12px",
                        border:
                          "none",
                        background:
                          "#FFFFFF",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: "9px",
                        color:
                          "#5B6070",
                        fontSize:
                          "11px",
                        textAlign:
                          "left",
                        cursor:
                          "pointer",
                      }}
                    >
                      <Globe
                        size={13}
                      />

                      Portfolio Link

                      <Copy
                        size={11}
                        style={{
                          marginLeft:
                            "auto",
                        }}
                      />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* QR */}

            {resumedata.public && (
              <button
                type="button"
                onClick={() =>
                  setShowQR(true)
                }
                style={{
                  height: "36px",
                  padding: "0 12px",
                  border:
                    "1px solid #DFDACC",
                  background:
                    "#FFFFFF",
                  color: "#5B6070",
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "6px",
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  textTransform:
                    "uppercase",
                  cursor: "pointer",
                }}
              >
                <QrCode size={13} />
                QR
              </button>
            )}

            {/* PORTFOLIO */}

            {resumedata.public && (
              <button
                type="button"
                onClick={() =>
                  window.open(
                    `/portfolio/${resumeId}`,
                    "_blank"
                  )
                }
                style={{
                  height: "36px",
                  padding: "0 12px",
                  border:
                    "1px solid #DFDACC",
                  background:
                    "#FFFFFF",
                  color: "#5B6070",
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "6px",
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  textTransform:
                    "uppercase",
                  cursor: "pointer",
                }}
              >
                <Globe size={13} />
                Portfolio
              </button>
            )}

            {/* VISIBILITY */}

            <button
              type="button"
              onClick={
                changeResumeVisibility
              }
              style={{
                height: "36px",
                padding: "0 12px",
                border:
                  "1px solid #DFDACC",
                background:
                  resumedata.public
                    ? "#F2F7F3"
                    : "#FFFFFF",
                color:
                  resumedata.public
                    ? "#2D7A50"
                    : "#5B6070",
                display: "flex",
                alignItems:
                  "center",
                gap: "6px",
                fontFamily:
                  "'IBM Plex Mono', monospace",
                fontSize: "8px",
                textTransform:
                  "uppercase",
                cursor: "pointer",
              }}
            >
              {resumedata.public ? (
                <EyeIcon size={13} />
              ) : (
                <EyeOffIcon size={13} />
              )}

              {resumedata.public
                ? "Public"
                : "Private"}
            </button>

            {/* DOWNLOAD */}

            <button
              type="button"
              onClick={
                downloadResume
              }
              style={{
                height: "36px",
                padding:
                  "0 15px",
                border:
                  "1px solid #171B24",
                background:
                  "#171B24",
                color: "#FFFFFF",
                display: "flex",
                alignItems:
                  "center",
                gap: "6px",
                fontFamily:
                  "'IBM Plex Mono', monospace",
                fontSize: "8px",
                textTransform:
                  "uppercase",
                letterSpacing:
                  ".05em",
                cursor: "pointer",
              }}
            >
              <DownloadIcon
                size={13}
              />

              Download
            </button>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
          padding:
            "28px clamp(16px, 3vw, 40px) 60px",
        }}
      >
        <div
          className="resume-builder-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(390px, 500px) minmax(500px, 1fr)",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* ================================================= */}
          {/* LEFT EDITOR */}
          {/* ================================================= */}

          <section
            style={{
              border:
                "1px solid #DFDACC",
              background:
                "#FFFFFF",
              position: "relative",
            }}
          >
            {/* EDITOR HEADER */}

            <div
              style={{
                padding:
                  "17px 20px",
                borderBottom:
                  "1px solid #DFDACC",
                background:
                  "#F7F6F1",
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
                      ".1em",
                  }}
                >
                  Editing
                </div>

                <div
                  style={{
                    fontFamily:
                      "'Newsreader', serif",
                    fontSize: "22px",
                    marginTop: "3px",
                  }}
                >
                  Build your resume
                </div>
              </div>
            </div>

            {/* SECTION NAV */}

            <div
              style={{
                padding:
                  "12px 20px",
                borderBottom:
                  "1px solid #DFDACC",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "8px",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: "29px",
                    height: "29px",
                    border:
                      "1px solid #DFDACC",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    color: "#C63B26",
                    flexShrink: 0,
                  }}
                >
                  {React.createElement(
                    activeSection.icon,
                    {
                      size: 14,
                      strokeWidth: 1.5,
                    }
                  )}
                </div>

                <div
                  style={{
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        "'IBM Plex Mono', monospace",
                      fontSize: "7px",
                      color: "#8A8F9B",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        ".08em",
                    }}
                  >
                    Section{" "}
                    {String(
                      activeSectionIndex +
                        1
                    ).padStart(2, "0")}
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#171B24",
                    }}
                  >
                    {activeSection.title}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "3px",
                }}
              >
                <button
                  type="button"
                  onClick={
                    previousSection
                  }
                  disabled={
                    activeSectionIndex ===
                    0
                  }
                  style={{
                    width: "30px",
                    height: "30px",
                    border:
                      "1px solid #DFDACC",
                    background:
                      "transparent",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    color:
                      activeSectionIndex ===
                      0
                        ? "#C9C7BF"
                        : "#5B6070",
                    cursor:
                      activeSectionIndex ===
                      0
                        ? "default"
                        : "pointer",
                  }}
                >
                  <ChevronLeft
                    size={14}
                  />
                </button>

                <button
                  type="button"
                  onClick={
                    nextSection
                  }
                  disabled={
                    activeSectionIndex ===
                    sections.length - 1
                  }
                  style={{
                    width: "30px",
                    height: "30px",
                    border:
                      "1px solid #DFDACC",
                    background:
                      "transparent",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    color:
                      activeSectionIndex ===
                      sections.length - 1
                        ? "#C9C7BF"
                        : "#5B6070",
                    cursor:
                      activeSectionIndex ===
                      sections.length - 1
                        ? "default"
                        : "pointer",
                  }}
                >
                  <ChevronRight
                    size={14}
                  />
                </button>
              </div>
            </div>

            {/* PROGRESS */}

            <div
              style={{
                height: "2px",
                background:
                  "#E7E4DB",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${
                    (activeSectionIndex *
                      100) /
                    (sections.length - 1)
                  }%`,
                  background:
                    "#C63B26",
                  transition:
                    "width .3s ease",
                }}
              />
            </div>

            {/* FORM */}

            <div
              style={{
                padding: "25px",
              }}
            >
              {/* PERSONAL */}

              {activeSection.id ===
                "personal" && (
                <PersonalInfo
                  data={
                    resumedata.personal_info
                  }
                  onChange={(data) =>
                    updateResumeData(
                      (prev) => ({
                        ...prev,
                        personal_info:
                          data,
                      })
                    )
                  }
                  removeBackground={
                    removeBackground
                  }
                  setRemoveBackground={
                    setRemoveBackground
                  }
                />
              )}

              {/* SUMMARY */}

              {activeSection.id ===
                "Summary" && (
                <ProfessionalSummary
                  data={
                    resumedata.professional_summary
                  }
                  onChange={(data) =>
                    updateResumeData(
                      (prev) => ({
                        ...prev,
                        professional_summary:
                          data,
                      })
                    )
                  }
                  setResumeData={
                    (updater) => {
                      updateResumeData(
                        updater
                      );
                    }
                  }
                />
              )}

              {/* EXPERIENCE */}

              {activeSection.id ===
                "Experience" && (
                <ExperienceForm
                  data={
                    resumedata.experience ||
                    []
                  }
                  onChange={(data) =>
                    updateResumeData(
                      (prev) => ({
                        ...prev,
                        experience:
                          data,
                      })
                    )
                  }
                />
              )}

              {/* EDUCATION */}

              {activeSection.id ===
                "Education" && (
                <EducationForm
                  data={
                    resumedata.education ||
                    []
                  }
                  onChange={(data) =>
                    updateResumeData(
                      (prev) => ({
                        ...prev,
                        education:
                          data,
                      })
                    )
                  }
                />
              )}

              {/* PROJECTS */}

              {activeSection.id ===
                "Projects" && (
                <ProjectForm
                  data={
                    resumedata.projects ||
                    []
                  }
                  onChange={(data) =>
                    updateResumeData(
                      (prev) => ({
                        ...prev,
                        projects:
                          data,
                      })
                    )
                  }
                />
              )}

              {/* SKILLS */}

              {activeSection.id ===
                "Skills" && (
                <SkillsForm
                  data={
                    resumedata.skills ||
                    []
                  }
                  onChange={(data) =>
                    updateResumeData(
                      (prev) => ({
                        ...prev,
                        skills:
                          data,
                      })
                    )
                  }
                />
              )}

              {/* NO MANUAL SAVE BUTTON */}
            </div>
          </section>

          {/* ================================================= */}
          {/* RIGHT DOCUMENT */}
          {/* ================================================= */}

          <section
            style={{
              minWidth: 0,
            }}
          >
            {/* PREVIEW HEADER */}

            <div
              style={{
                border:
                  "1px solid #DFDACC",
                borderBottom:
                  "none",
                background:
                  "#F7F6F1",
                padding:
                  "13px 17px",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "8px",
                }}
              >
                <FileText
                  size={14}
                  strokeWidth={1.5}
                  color="#C63B26"
                />

                <span
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
                  Live preview
                </span>
              </div>

              <span
                style={{
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  color: "#8A8F9B",
                }}
              >
                A4 / DOCUMENT
              </span>
            </div>

            {/* DOCUMENT */}

            <div
              style={{
                background:
                  "#E9E6DE",
                border:
                  "1px solid #DFDACC",
                padding:
                  "clamp(12px, 2vw, 28px)",
                minHeight:
                  "700px",
              }}
            >
              <div
                ref={resumeRef}
                style={{
                  width: "100%",
                }}
              >
                <ResumePreview
                  data={resumedata}
                  accentColor={
                    resumedata.accent_color
                  }
                  template={
                    resumedata.template
                  }
                  onReorder={
                    handleReorder
                  }
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ================================================= */}
      {/* QR MODAL */}
      {/* ================================================= */}

      {showQR && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(23,27,36,.45)",
            backdropFilter:
              "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "380px",
              background:
                "#FBFAF6",
              border:
                "1px solid #DFDACC",
            }}
          >
            <div
              style={{
                padding:
                  "15px 18px",
                borderBottom:
                  "1px solid #DFDACC",
                display: "flex",
                alignItems:
                  "center",
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
                  Public portfolio
                </div>

                <div
                  style={{
                    fontFamily:
                      "'Newsreader', serif",
                    fontSize: "20px",
                    marginTop: "3px",
                  }}
                >
                  Scan to open
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowQR(false)
                }
                style={{
                  border:
                    "1px solid #DFDACC",
                  background:
                    "transparent",
                  width: "28px",
                  height: "28px",
                  cursor:
                    "pointer",
                  color:
                    "#5B6070",
                  fontSize: "18px",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                padding: "28px",
                textAlign:
                  "center",
              }}
            >
              <div
                style={{
                  background:
                    "#FFFFFF",
                  border:
                    "1px solid #DFDACC",
                  padding: "20px",
                  display:
                    "inline-flex",
                }}
              >
                <QRCode
                  value={
                    portfolioUrl
                  }
                  size={180}
                />
              </div>

              <p
                style={{
                  fontSize: "11px",
                  color: "#5B6070",
                  lineHeight: 1.6,
                  marginTop:
                    "18px",
                }}
              >
                Scan this QR code
                to open your
                public portfolio.
              </p>

              <p
                style={{
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  color: "#8A8F9B",
                  marginTop:
                    "8px",
                  wordBreak:
                    "break-all",
                }}
              >
                {portfolioUrl}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* RESPONSIVE */}
      {/* ================================================= */}

      <style>{`
        @media (max-width: 1050px) {
          .resume-builder-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 700px) {
          .resume-builder-grid {
            display: block !important;
          }

          .resume-builder-grid > section:first-child {
            margin-bottom: 25px;
          }
        }

        @media (max-width: 600px) {
          .resume-builder-grid > section:first-child {
            margin-bottom: 20px;
          }
        }

        @media print {
          body {
            background: white !important;
          }

          header,
          .resume-builder-grid > section:first-child {
            display: none !important;
          }

          main {
            padding: 0 !important;
            margin: 0 !important;
          }

          .resume-builder-grid {
            display: block !important;
          }

          .resume-builder-grid > section:last-child {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;