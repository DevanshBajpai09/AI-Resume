import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <>
      <section
        id="cta"
        style={{
          margin: "0 96px 90px",
          background: "#171B24",
          color: "#FBFAF6",
          padding: "64px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "30px",
          position: "relative",
          zIndex: 2,
          borderRadius: "2px",
        }}
      >
        {/* CTA text */}
        <h2
          style={{
            fontFamily: "'Newsreader', serif",
            fontSize: "30px",
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            color: "#FBFAF6",
            maxWidth: "420px",
            margin: 0,
          }}
        >
          Your next draft is one upload away.
        </h2>

        {/* CTA button */}
        <Link
          to="/app"
          style={{
            background: "#FBFAF6",
            color: "#171B24",
            padding: "15px 28px",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "12.5px",
            letterSpacing: "0.04em",
            borderRadius: "3px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            border: "1px solid transparent",
            transition:
              "transform .15s ease, box-shadow .15s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "3px 3px 0 #FCE388";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <span>Start the review</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </section>

      <style>{`
        @media (max-width: 820px) {
          #cta {
            flex-direction: column !important;
            align-items: flex-start !important;
            margin: 0 24px 64px 52px !important;
            padding: 44px 30px !important;
          }

          #cta h2 {
            font-size: 28px !important;
          }
        }
      `}</style>
    </>
  );
};

export default CallToAction;