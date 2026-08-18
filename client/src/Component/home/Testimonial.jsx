import React from "react";
import TestimonialHover from "./TestimonialHover";

const Testimonial = () => {
  return (
    <>
      <section
        id="testimonials"
        style={{
          background: "#F3F1EA",
          padding: "90px 96px",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        {/* Section heading */}
        <div
          style={{
            maxWidth: "560px",
            marginBottom: "40px",
          }}
        >
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

            Notes from the margin
          </div>

          <h2
            style={{
              fontFamily: "'Newsreader', serif",
              fontWeight: 500,
              fontSize: "36px",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              color: "#171B24",
              marginTop: "16px",
              marginBottom: "0",
            }}
          >
            What reviewers actually wrote back.
          </h2>
        </div>

        {/* KEEP THE SLIDING TESTIMONIALS */}
        <TestimonialHover />
      </section>

      <style>{`
        @media (max-width: 760px) {
          #notes {
            padding: 64px 24px 64px 52px !important;
          }

          #notes h2 {
            font-size: 32px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Testimonial;