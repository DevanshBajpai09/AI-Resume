import React from "react";

const Process = () => {
  const colors = {
    paper: "#FBFAF6",
    rule: "#DFDACC",
    ink: "#171B24",
    inkSoft: "#5B6070",
    red: "#C63B26",
  };

  const eyebrowStyle = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "11.5px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: colors.inkSoft,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const headingStyle = {
    fontFamily: "'Newsreader', serif",
    fontWeight: 500,
    lineHeight: 1.08,
    letterSpacing: "-0.01em",
    fontSize: "36px",
    marginTop: "16px",
    color: colors.ink,
  };

  const descriptionStyle = {
    color: colors.inkSoft,
    marginTop: "14px",
    lineHeight: 1.6,
    fontSize: "15.5px",
    fontFamily: "'Inter', sans-serif",
  };

  const itemStyle = {
    padding: "30px 26px 30px 0",
    borderBottom: `1px solid ${colors.rule}`,
    borderRight: `1px solid ${colors.rule}`,
  };

  const numberStyle = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "12px",
    color: colors.red,
    marginBottom: "14px",
  };

  const itemHeadingStyle = {
    fontFamily: "'Newsreader', serif",
    fontSize: "21px",
    fontWeight: 500,
    lineHeight: 1.08,
    letterSpacing: "-0.01em",
    marginBottom: "10px",
    color: colors.ink,
  };

  const itemDescriptionStyle = {
    color: colors.inkSoft,
    fontSize: "14.5px",
    lineHeight: 1.6,
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <section
      id="process"
      style={{
        padding: "90px 96px",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Section heading */}
      <div
        style={{
          maxWidth: "560px",
          marginBottom: "56px",
        }}
      >
        <div style={eyebrowStyle}>
          <span
            style={{
              width: "14px",
              height: "1px",
              backgroundColor: colors.red,
              display: "inline-block",
            }}
          />

          <span>The process</span>
        </div>

        <h2 style={headingStyle}>
          Three passes, same document.
        </h2>

        <p style={descriptionStyle}>
          No blank templates. You start with what you have, and each pass
          sharpens it — like an editor working a manuscript, not a form
          generator filling fields.
        </p>
      </div>

      {/* Process */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: `1px solid ${colors.rule}`,
        }}
      >
        {/* 01 */}
        <div style={itemStyle}>
          <div style={numberStyle}>
            01 / Draft
          </div>

          <h3 style={itemHeadingStyle}>
            Bring what you've got
          </h3>

          <p style={itemDescriptionStyle}>
            Upload an old resume, a LinkedIn export, or just start typing.
            The AI structures it into proper sections automatically.
          </p>
        </div>

        {/* 02 */}
        <div style={itemStyle}>
          <div style={numberStyle}>
            02 / Match
          </div>

          <h3 style={itemHeadingStyle}>
            Paste the job post
          </h3>

          <p style={itemDescriptionStyle}>
            The AI compares your resume against the listing, scores your ATS
            match, and flags missing keywords line by line.
          </p>
        </div>

        {/* 03 */}
        <div
          style={{
            ...itemStyle,
            borderRight: "none",
          }}
        >
          <div style={numberStyle}>
            03 / Polish
          </div>

          <h3 style={itemHeadingStyle}>
            Accept or rewrite
          </h3>

          <p style={itemDescriptionStyle}>
            Every suggestion shows the before and after. Keep your voice —
            approve edits one at a time, or accept all in one pass.
          </p>
        </div>
      </div>

      {/* Responsive */}
      <style>
        {`
          @media (max-width: 820px) {
            #process > div:last-child {
              grid-template-columns: 1fr !important;
            }

            #process > div:last-child > div {
              border-right: none !important;
              padding: 26px 0 !important;
            }
          }

          @media (max-width: 760px) {
            #process {
              padding: 64px 24px 64px 52px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Process;