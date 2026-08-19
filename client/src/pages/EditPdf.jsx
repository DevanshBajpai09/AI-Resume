import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeftIcon,
    DownloadIcon,
    Save,
    Undo2,
    Redo2,
    EyeIcon,
    PencilIcon,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Highlighter,
    Type,
    Image,
    PenLine,
    Eraser,
    Square,
    Circle,
    Minus,
    Plus,
    ZoomIn,
    ZoomOut,
    FileText,
    Trash2,
} from "lucide-react";
import PdfEditor from "../Component/PdfEditor";

const EditPdf = () => {
    const { id } = useParams();

    const [mode, setMode] = useState("edit");
    const [activePage, setActivePage] = useState(1);
    const [zoom, setZoom] = useState(80);
    const [fontSize, setFontSize] = useState(14);
    const [fontFamily, setFontFamily] = useState("Arial");
    const [selectedTool, setSelectedTool] = useState(null);

    const token = localStorage.getItem("token");

    const pages = [1, 2, 3];

    const toolButton = (tool) => {
        setSelectedTool(
            selectedTool === tool ? null : tool
        );
    };

    const zoomIn = () => {
        setZoom((prev) => Math.min(prev + 10, 150));
    };

    const zoomOut = () => {
        setZoom((prev) => Math.max(prev - 10, 50));
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#FBFAF6",
                color: "#171B24",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <header
                style={{
                    minHeight: "68px",
                    borderBottom: "1px solid #DFDACC",
                    background: "#FBFAF6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px clamp(16px, 4vw, 60px)",
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    gap: "15px",
                }}
            >
                {/* BACK */}

                <Link
                    to="/app"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#5B6070",
                        textDecoration: "none",
                        fontFamily: "'IBM Plex Mono', monospace",
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
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "8px",
                            color: "#C63B26",
                            textTransform: "uppercase",
                            letterSpacing: ".12em",
                        }}
                    >
                        PDF editor
                    </div>

                    <div
                        style={{
                            fontFamily: "'Newsreader', serif",
                            fontSize: "18px",
                            fontWeight: 500,
                            color: "#171B24",
                            marginTop: "2px",
                            maxWidth: "300px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        My Resume.pdf
                    </div>
                </div>

                {/* RIGHT */}

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        flexShrink: 0,
                    }}
                >
                    <button
                        type="button"
                        className="pdf-header-button"
                    >
                        <Save size={13} />
                        Save
                    </button>

                    <button
                        type="button"
                        className="pdf-download-button"
                    >
                        <DownloadIcon size={13} />
                        Download
                    </button>
                </div>
            </header>

            {/* ================================================= */}
            {/* MODE SWITCH */}
            {/* ================================================= */}

            <div
                style={{
                    position: "sticky",
                    top: "68px",
                    zIndex: 40,
                    background: "rgba(251,250,246,.96)",
                    backdropFilter: "blur(10px)",
                    borderBottom: "1px solid #DFDACC",
                    padding: "9px clamp(16px, 4vw, 60px)",
                }}
            >
                <div
                    style={{
                        maxWidth: "1500px",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            border: "1px solid #DFDACC",
                            background: "#F7F6F1",
                            padding: "3px",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setMode("view")}
                            className={`pdf-mode-button ${mode === "view" ? "active" : ""
                                }`}
                        >
                            <EyeIcon size={13} />
                            View
                        </button>

                        <button
                            type="button"
                            onClick={() => setMode("edit")}
                            className={`pdf-mode-button ${mode === "edit" ? "active" : ""
                                }`}
                        >
                            <PencilIcon size={13} />
                            Edit
                        </button>
                    </div>
                </div>
            </div>

            {/* ================================================= */}
            {/* EDIT TOOLBAR */}
            {/* ================================================= */}

            {mode === "edit" && (
                <div
                    style={{
                        borderBottom: "1px solid #DFDACC",
                        background: "#FFFFFF",
                        position: "sticky",
                        top: "117px",
                        zIndex: 35,
                        overflowX: "auto",
                    }}
                >
                    <div
                        style={{
                            maxWidth: "1500px",
                            margin: "0 auto",
                            padding: "8px clamp(16px, 3vw, 40px)",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            minWidth: "max-content",
                        }}
                    >
                        {/* UNDO / REDO */}

                        <ToolButton
                            icon={<Undo2 size={14} />}
                            label="Undo"
                            onClick={() => { }}
                        />

                        <ToolButton
                            icon={<Redo2 size={14} />}
                            label="Redo"
                            onClick={() => { }}
                        />

                        <ToolbarDivider />

                        {/* FONT */}

                        <select
                            value={fontFamily}
                            onChange={(e) =>
                                setFontFamily(e.target.value)
                            }
                            className="pdf-select"
                            title="Font family"
                        >
                            <option>Arial</option>
                            <option>Helvetica</option>
                            <option>Times New Roman</option>
                            <option>Georgia</option>
                            <option>Inter</option>
                        </select>

                        <select
                            value={fontSize}
                            onChange={(e) =>
                                setFontSize(e.target.value)
                            }
                            className="pdf-select pdf-size-select"
                            title="Font size"
                        >
                            <option value="10">10</option>
                            <option value="12">12</option>
                            <option value="14">14</option>
                            <option value="16">16</option>
                            <option value="18">18</option>
                            <option value="20">20</option>
                            <option value="24">24</option>
                            <option value="28">28</option>
                            <option value="32">32</option>
                        </select>

                        <ToolbarDivider />

                        {/* TEXT STYLE */}

                        <ToolButton
                            icon={<Bold size={14} />}
                            label="Bold"
                            active={selectedTool === "bold"}
                            onClick={() => toolButton("bold")}
                        />

                        <ToolButton
                            icon={<Italic size={14} />}
                            label="Italic"
                            active={selectedTool === "italic"}
                            onClick={() => toolButton("italic")}
                        />

                        <ToolButton
                            icon={<Underline size={14} />}
                            label="Underline"
                            active={selectedTool === "underline"}
                            onClick={() =>
                                toolButton("underline")
                            }
                        />

                        <ToolButton
                            icon={<Strikethrough size={14} />}
                            label="Strike"
                            active={selectedTool === "strike"}
                            onClick={() =>
                                toolButton("strike")
                            }
                        />

                        <ToolbarDivider />

                        {/* COLOR */}

                        <button
                            type="button"
                            className="pdf-tool-button"
                            title="Text color"
                        >
                            <span
                                style={{
                                    fontSize: "13px",
                                    fontWeight: 700,
                                }}
                            >
                                A
                            </span>

                            <span
                                style={{
                                    position: "absolute",
                                    bottom: "5px",
                                    width: "14px",
                                    height: "2px",
                                    background: "#C63B26",
                                }}
                            />
                        </button>

                        <ToolButton
                            icon={<Highlighter size={14} />}
                            label="Highlight"
                            active={selectedTool === "highlight"}
                            onClick={() =>
                                toolButton("highlight")
                            }
                        />

                        <ToolbarDivider />

                        {/* ALIGN */}

                        <ToolButton
                            icon={<AlignLeft size={14} />}
                            label="Left"
                            onClick={() => { }}
                        />

                        <ToolButton
                            icon={<AlignCenter size={14} />}
                            label="Center"
                            onClick={() => { }}
                        />

                        <ToolButton
                            icon={<AlignRight size={14} />}
                            label="Right"
                            onClick={() => { }}
                        />

                        <ToolbarDivider />

                        {/* LINE SPACING */}

                        <button
                            type="button"
                            className="pdf-labeled-button"
                        >
                            <span
                                style={{
                                    lineHeight: 0.8,
                                    fontSize: "13px",
                                }}
                            >
                                ≡
                            </span>

                            Line spacing
                        </button>

                        {/* TEXT POSITION */}

                        <button
                            type="button"
                            className="pdf-labeled-button"
                        >
                            <Type size={13} />
                            Text position
                        </button>

                        <ToolbarDivider />

                        {/* ADD TEXT */}

                        <ToolButton
                            icon={<Type size={14} />}
                            label="Add text"
                            active={selectedTool === "text"}
                            onClick={() => toolButton("text")}
                        />

                        {/* DELETE */}

                        <ToolButton
                            icon={<Trash2 size={14} />}
                            label="Delete"
                            active={selectedTool === "delete"}
                            onClick={() =>
                                toolButton("delete")
                            }
                        />

                        <ToolbarDivider />

                        {/* IMAGE */}

                        <ToolButton
                            icon={<Image size={14} />}
                            label="Image"
                            active={selectedTool === "image"}
                            onClick={() =>
                                toolButton("image")
                            }
                        />

                        {/* DRAW */}

                        <ToolButton
                            icon={<PenLine size={14} />}
                            label="Draw"
                            active={selectedTool === "draw"}
                            onClick={() =>
                                toolButton("draw")
                            }
                        />

                        {/* ERASER */}

                        <ToolButton
                            icon={<Eraser size={14} />}
                            label="Eraser"
                            active={selectedTool === "eraser"}
                            onClick={() =>
                                toolButton("eraser")
                            }
                        />

                        {/* SHAPES */}

                        <ToolButton
                            icon={<Square size={14} />}
                            label="Shape"
                            active={selectedTool === "shape"}
                            onClick={() =>
                                toolButton("shape")
                            }
                        />
                    </div>
                </div>
            )}

            {/* ================================================= */}
            {/* MAIN DOCUMENT AREA */}
            {/* ================================================= */}

            <main
                style={{
                    flex: 1,
                    background: "#E9E6DE",
                    minHeight: "calc(100vh - 170px)",
                }}
            >
                <div
                    className="pdf-editor-layout"
                    style={{
                        maxWidth: "1500px",
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns:
                            "170px minmax(0, 1fr)",
                        minHeight:
                            "calc(100vh - 170px)",
                    }}
                >
                    {/* ================================================= */}
                    {/* LEFT PAGE SIDEBAR */}
                    {/* ================================================= */}

                    <aside
                        style={{
                            background: "#F7F6F1",
                            borderRight:
                                "1px solid #DFDACC",
                            padding: "18px 14px",
                            overflowY: "auto",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent:
                                    "space-between",
                                marginBottom: "15px",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily:
                                        "'IBM Plex Mono', monospace",
                                    fontSize: "8px",
                                    color: "#5B6070",
                                    textTransform:
                                        "uppercase",
                                    letterSpacing: ".08em",
                                }}
                            >
                                Pages
                            </span>

                            <span
                                style={{
                                    fontFamily:
                                        "'IBM Plex Mono', monospace",
                                    fontSize: "8px",
                                    color: "#9A9DA6",
                                }}
                            >
                                {pages.length}
                            </span>
                        </div>

                        {pages.map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() =>
                                    setActivePage(page)
                                }
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: 0,
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                    marginBottom: "14px",
                                    textAlign: "left",
                                }}
                            >
                                <div
                                    style={{
                                        border:
                                            activePage === page
                                                ? "2px solid #C63B26"
                                                : "1px solid #D5D1C6",
                                        background: "#FFFFFF",
                                        padding: "7px",
                                        boxShadow:
                                            activePage === page
                                                ? "0 5px 15px rgba(23,27,36,.08)"
                                                : "none",
                                    }}
                                >
                                    <Thumbnail />
                                </div>

                                <div
                                    style={{
                                        marginTop: "6px",
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                        fontFamily:
                                            "'IBM Plex Mono', monospace",
                                        fontSize: "7px",
                                        color:
                                            activePage === page
                                                ? "#C63B26"
                                                : "#8A8F9B",
                                        textTransform:
                                            "uppercase",
                                    }}
                                >
                                    <span>
                                        Page{" "}
                                        {String(page).padStart(
                                            2,
                                            "0"
                                        )}
                                    </span>

                                    <span>{page}</span>
                                </div>
                            </button>
                        ))}

                        <button
                            type="button"
                            style={{
                                width: "100%",
                                height: "34px",
                                border:
                                    "1px dashed #CFCBC0",
                                background:
                                    "transparent",
                                color: "#8A8F9B",
                                display: "flex",
                                alignItems: "center",
                                justifyContent:
                                    "center",
                                gap: "6px",
                                fontFamily:
                                    "'IBM Plex Mono', monospace",
                                fontSize: "7px",
                                textTransform:
                                    "uppercase",
                                cursor: "pointer",
                            }}
                        >
                            <Plus size={12} />
                            Add page
                        </button>
                    </aside>

                    {/* ================================================= */}
                    {/* PDF CANVAS */}
                    {/* ================================================= */}

                    <section
                        style={{
                            position: "relative",
                            minWidth: 0,
                            overflow: "hidden",
                            height: "calc(100vh - 170px)",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                background: "#E9E6DE",
                                overflow: "hidden",
                            }}
                        >
                            <PdfEditor
                                pdfId={id}
                                token={token}
                            />
                            {/* PDF PAGE */}

                            <div

                            >

                            </div>
                        </div>

                        {/* ================================================= */}
                        {/* ZOOM CONTROLS */}
                        {/* ================================================= */}

                        <div
                            style={{
                                position: "fixed",
                                right: "25px",
                                bottom: "22px",
                                display: "flex",
                                alignItems: "center",
                                border:
                                    "1px solid #DFDACC",
                                background: "#FBFAF6",
                                boxShadow:
                                    "0 8px 25px rgba(23,27,36,.08)",
                            }}
                        >
                            <button
                                type="button"
                                onClick={zoomOut}
                                className="pdf-zoom-button"
                                title="Zoom out"
                            >
                                <ZoomOut size={14} />
                            </button>

                            <div
                                style={{
                                    minWidth: "55px",
                                    textAlign: "center",
                                    fontFamily:
                                        "'IBM Plex Mono', monospace",
                                    fontSize: "8px",
                                    color: "#5B6070",
                                }}
                            >
                                {zoom}%
                            </div>

                            <button
                                type="button"
                                onClick={zoomIn}
                                className="pdf-zoom-button"
                                title="Zoom in"
                            >
                                <ZoomIn size={14} />
                            </button>
                        </div>

                        {/* PAGE NUMBER */}

                        <div
                            style={{
                                position: "fixed",
                                left: "205px",
                                bottom: "22px",
                                height: "38px",
                                padding: "0 13px",
                                display: "flex",
                                alignItems: "center",
                                background: "#FBFAF6",
                                border:
                                    "1px solid #DFDACC",
                                fontFamily:
                                    "'IBM Plex Mono', monospace",
                                fontSize: "8px",
                                color: "#5B6070",
                                textTransform:
                                    "uppercase",
                            }}
                        >
                            Page{" "}
                            {String(activePage).padStart(
                                2,
                                "0"
                            )}{" "}
                            /{" "}
                            {String(pages.length).padStart(
                                2,
                                "0"
                            )}
                        </div>
                    </section>
                </div>
            </main>

            {/* ================================================= */}
            {/* RESPONSIVE */}
            {/* ================================================= */}

            <style>{`
        .pdf-header-button {
          height: 36px;
          padding: 0 12px;
          border: 1px solid #DFDACC;
          background: #FFFFFF;
          color: #5B6070;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 8px;
          text-transform: uppercase;
          cursor: pointer;
        }

        .pdf-header-button:hover {
          border-color: #BDB8AC;
        }

        .pdf-download-button {
          height: 36px;
          padding: 0 14px;
          border: 1px solid #171B24;
          background: #171B24;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: .04em;
          cursor: pointer;
        }

        .pdf-mode-button {
          height: 32px;
          padding: 0 22px;
          border: none;
          background: transparent;
          color: #7B7F88;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: .05em;
          cursor: pointer;
        }

        .pdf-mode-button.active {
          background: #171B24;
          color: #FFFFFF;
        }

        .pdf-tool-button {
          position: relative;
          min-width: 34px;
          height: 34px;
          padding: 0 7px;
          border: 1px solid transparent;
          background: transparent;
          color: #5B6070;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          cursor: pointer;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 6px;
          text-transform: uppercase;
        }

        .pdf-tool-button:hover,
        .pdf-tool-button.active {
          background: #F7F6F1;
          border-color: #DFDACC;
          color: #171B24;
        }

        .pdf-select {
          height: 34px;
          border: 1px solid #DFDACC;
          background: #FFFFFF;
          color: #5B6070;
          padding: 0 9px;
          outline: none;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 8px;
          cursor: pointer;
        }

        .pdf-size-select {
          width: 62px;
        }

        .pdf-labeled-button {
          height: 34px;
          padding: 0 9px;
          border: 1px solid #DFDACC;
          background: #FFFFFF;
          color: #5B6070;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 7px;
          text-transform: uppercase;
          cursor: pointer;
        }

        .pdf-labeled-button:hover {
          background: #F7F6F1;
        }

        .pdf-zoom-button {
          width: 38px;
          height: 38px;
          border: none;
          background: transparent;
          color: #5B6070;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .pdf-zoom-button:hover {
          background: #F7F6F1;
        }

        @media (max-width: 800px) {
          .pdf-editor-layout {
            grid-template-columns: 120px minmax(0, 1fr) !important;
          }
        }

        @media (max-width: 600px) {
          .pdf-editor-layout {
            grid-template-columns: 1fr !important;
          }

          .pdf-editor-layout > aside {
            display: none;
          }

          .pdf-header-button {
            padding: 0 8px;
          }

          .pdf-download-button {
            padding: 0 9px;
          }
        }
      `}</style>
        </div>
    );
};


/* ================================================= */
/* TOOLBAR BUTTON */
/* ================================================= */

const ToolButton = ({
    icon,
    label,
    active,
    onClick,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            title={label}
            className={`pdf-tool-button ${active ? "active" : ""
                }`}
        >
            {icon}

            {label && (
                <span>{label}</span>
            )}
        </button>
    );
};


/* ================================================= */
/* DIVIDER */
/* ================================================= */

const ToolbarDivider = () => (
    <div
        style={{
            width: "1px",
            height: "24px",
            background: "#DFDACC",
            margin: "0 4px",
            flexShrink: 0,
        }}
    />
);


/* ================================================= */
/* PAGE THUMBNAIL */
/* ================================================= */

const Thumbnail = () => {
    return (
        <div
            style={{
                aspectRatio: "0.707",
                background: "#FBFAF6",
                padding: "12px 9px",
            }}
        >
            <div
                style={{
                    width: "58%",
                    height: "5px",
                    background: "#343841",
                    marginBottom: "7px",
                }}
            />

            <div
                style={{
                    width: "82%",
                    height: "3px",
                    background: "#D5D1C6",
                    marginBottom: "4px",
                }}
            />

            <div
                style={{
                    width: "90%",
                    height: "3px",
                    background: "#D5D1C6",
                    marginBottom: "4px",
                }}
            />

            <div
                style={{
                    width: "70%",
                    height: "3px",
                    background: "#D5D1C6",
                    marginBottom: "16px",
                }}
            />

            {[1, 2, 3, 4, 5, 6, 7].map(
                (item) => (
                    <div
                        key={item}
                        style={{
                            width:
                                `${55 + (item % 3) * 15}%`,
                            height: "3px",
                            background: "#E0DDD4",
                            marginBottom: "5px",
                        }}
                    />
                )
            )}
        </div>
    );
};


/* ================================================= */
/* PDF PREVIEW SECTION */
/* ================================================= */

const PreviewSection = ({
    title,
    zoom,
}) => (
    <div
        style={{
            fontFamily:
                "'IBM Plex Mono', monospace",
            fontSize:
                `${9 * (zoom / 100)}px`,
            color: "#C63B26",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            marginTop:
                `${24 * (zoom / 100)}px`,
            marginBottom:
                `${11 * (zoom / 100)}px`,
            fontWeight: 600,
        }}
    >
        {title}
    </div>
);


/* ================================================= */
/* PDF PREVIEW LINES */
/* ================================================= */

const PreviewLines = ({ zoom }) => (
    <div>
        {[90, 96, 84, 72, 92, 65].map(
            (width, index) => (
                <div
                    key={index}
                    style={{
                        width: `${width}%`,
                        height:
                            `${5 * (zoom / 100)}px`,
                        background: "#D8D5CD",
                        marginBottom:
                            `${8 * (zoom / 100)}px`,
                    }}
                />
            )
        )}
    </div>
);

export default EditPdf;