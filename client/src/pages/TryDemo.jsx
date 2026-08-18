import React, { useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const TryDemo = () => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FBFAF6",
        color: "#171B24",
        position: "relative",
        overflowX: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Continuous document margin line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "64px",
          width: "1px",
          background: "#DFDACC",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <main
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "0 96px",
        }}
      >
        {/* Back button */}
        <div
          style={{
            paddingTop: "30px",
          }}
        >
          <button
            onClick={goBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: "#5B6070",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#171B24";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#5B6070";
            }}
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>

        {/* Header */}
        <section
          style={{
            paddingTop: "70px",
            paddingBottom: "48px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11.5px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#5B6070",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                width: "14px",
                height: "1px",
                background: "#C63B26",
                display: "inline-block",
              }}
            />

            Live product demo
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Newsreader', serif",
              fontWeight: 500,
              fontSize: "52px",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              maxWidth: "650px",
              margin: "20px 0 18px",
              color: "#171B24",
            }}
          >
            See the product
            <br />
            <em
              style={{
                color: "#2547D0",
                fontStyle: "italic",
              }}
            >
              in action.
            </em>
          </h1>

          <p
            style={{
              color: "#5B6070",
              fontSize: "16px",
              lineHeight: 1.65,
              maxWidth: "540px",
              margin: 0,
            }}
          >
            Watch a short walkthrough of how the platform reads your
            resume, finds opportunities to improve it, and helps you
            prepare it for the job you're targeting.
          </p>
        </section>

        {/* Video area */}
        <section
          style={{
            position: "relative",
            paddingBottom: "90px",
          }}
        >
          {/* Video annotation */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "30px",
              width: "90px",
              height: "90px",
              border: "2px solid #C63B26",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(8deg)",
              color: "#C63B26",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px",
              lineHeight: 1.3,
              textAlign: "center",
              background: "rgba(255,255,255,.65)",
              zIndex: 5,
            }}
          >
            WATCH
            <br />
            THE
            <br />
            WALKTHROUGH
          </div>

          {/* Video frame */}
          <div
            style={{
              position: "relative",
              background: "#FFFFFF",
              border: "1px solid #DFDACC",
              boxShadow:
                "0 30px 60px -30px rgba(23,27,36,.25)",
              borderRadius: "2px",
              padding: "12px",
              transform: "rotate(-0.6deg)",
            }}
          >
            {/* Inner video */}
            <div
              style={{
                position: "relative",
                background: "#171B24",
                overflow: "hidden",
                border: "1px solid #DFDACC",
              }}
            >
              <video
                ref={videoRef}
                src="https://lnlp4pf1nbxqmmvo.public.blob.vercel-storage.com/Devansh%27s%20video.mp4"
                playsInline
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  maxHeight: "680px",
                  objectFit: "contain",
                  background: "#171B24",
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Video label */}
              <div
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "16px",
                  background: "#FBFAF6",
                  border: "1px solid #DFDACC",
                  padding: "7px 10px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#171B24",
                }}
              >
                Product walkthrough
              </div>
            </div>

            {/* Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                padding: "14px 4px 2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* Play */}
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #171B24",
                    background: "#171B24",
                    color: "#FBFAF6",
                    borderRadius: "2px",
                    cursor: "pointer",
                    transition:
                      "transform .15s ease, box-shadow .15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "3px 3px 0 #C63B26";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {isPlaying ? (
                    <Pause size={16} />
                  ) : (
                    <Play size={16} />
                  )}
                </button>

                {/* Mute */}
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #DFDACC",
                    background: "#FBFAF6",
                    color: "#171B24",
                    borderRadius: "2px",
                    cursor: "pointer",
                    transition: "background .15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "#F3F1EA";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "#FBFAF6";
                  }}
                >
                  {isMuted ? (
                    <VolumeX size={16} />
                  ) : (
                    <Volume2 size={16} />
                  )}
                </button>
              </div>

              {/* Right label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#5B6070",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: isPlaying
                      ? "#C63B26"
                      : "#DFDACC",
                  }}
                />

                {isPlaying ? "Playing" : "Product Demo"}
              </div>
            </div>
          </div>

          {/* AI note */}
          <div
            style={{
              position: "absolute",
              right: "-30px",
              bottom: "145px",
              width: "160px",
              background: "#FFFFFF",
              border: "1px solid #DFDACC",
              boxShadow:
                "0 12px 26px -12px rgba(23,27,36,.35)",
              padding: "10px 12px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              lineHeight: 1.5,
              color: "#171B24",
              transform: "rotate(2deg)",
            }}
          >
            <b
              style={{
                color: "#C63B26",
              }}
            >
              AI note —
            </b>{" "}
            watch how the platform marks the weak sections before
            suggesting changes.
          </div>
        </section>

        {/* Bottom navigation */}
        <div
          style={{
            borderTop: "1px solid #DFDACC",
            padding: "22px 0 60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <button
            onClick={goBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              color: "#5B6070",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              color: "#5B6070",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Resume / Product Demo
          </div>

          <a
            href="/app"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#171B24",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              textDecoration: "none",
            }}
          >
            Try it yourself
            <ArrowRight size={14} />
          </a>
        </div>
      </main>

      {/* Mobile */}
      <style>{`
        @media (max-width: 960px) {
          main {
            padding: 0 52px 0 52px !important;
          }

          #try-demo-title {
            font-size: 44px !important;
          }
        }

        @media (max-width: 760px) {
          main {
            padding: 0 24px 0 52px !important;
          }

          #try-demo-title {
            font-size: 38px !important;
          }

          .demo-stamp {
            right: 0 !important;
          }

          .demo-note {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TryDemo;