import React from "react";

const TestimonialHover = () => {
  const cardsData = [
    {
      name: "Briar Martin",
      role: "Frontend Engineer",
      quote:
        "It circled the exact bullet a recruiter would've skipped over. That's the part I couldn't see myself.",
    },
    {
      name: "Avery Johnson",
      role: "Data Analyst",
      quote:
        "Went from a 61% to a 92% match on the listing just by accepting the keyword suggestions.",
    },
    {
      name: "Jordan Lee",
      role: "Product Designer",
      quote:
        "Finally a tool that edits my resume instead of handing me a template to fill in.",
    },
    {
      name: "Maya Chen",
      role: "Software Engineer",
      quote:
        "The before-and-after suggestions made it much easier to understand why one version was stronger.",
    },
  ];

  const CreateCard = ({ card }) => {
    return (
      <div
        style={{
          position: "relative",
          background: "#FFFFFF",
          border: "1px solid #DFDACC",
          padding: "22px 22px 18px",
          width: "320px",
          minHeight: "175px",
          flexShrink: 0,
          margin: "0 11px",
          boxShadow: "0 8px 20px -14px rgba(23,27,36,.25)",
          transition:
            "transform .2s ease, box-shadow .2s ease",
          cursor: "default",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow =
            "0 16px 30px -14px rgba(23,27,36,.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 8px 20px -14px rgba(23,27,36,.25)";
        }}
      >
        {/* Yellow margin mark */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "4px",
            height: "100%",
            background: "#FCE388",
          }}
        />

        {/* Quote */}
        <p
          style={{
            fontFamily: "'Newsreader', serif",
            fontStyle: "italic",
            fontSize: "16px",
            lineHeight: 1.5,
            color: "#171B24",
            margin: "0 0 18px 0",
          }}
        >
          "{card.quote}"
        </p>

        {/* Person */}
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "11px",
            color: "#5B6070",
          }}
        >
          <strong
            style={{
              color: "#171B24",
              fontWeight: 600,
            }}
          >
            {card.name}
          </strong>

          <span> — {card.role}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @keyframes editorialMarquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .testimonial-marquee {
          animation: editorialMarquee 30s linear infinite;
        }

        .testimonial-marquee-reverse {
          animation: editorialMarquee 30s linear infinite reverse;
        }

        .testimonial-marquee:hover,
        .testimonial-marquee-reverse:hover {
          animation-play-state: paused;
        }

        .testimonial-row {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .testimonial-track {
          display: flex;
          width: max-content;
          padding: 10px 0 12px;
        }

        .testimonial-fade-left {
          position: absolute;
          left: 0;
          top: 0;
          width: 90px;
          height: 100%;
          z-index: 5;
          pointer-events: none;
          background: linear-gradient(
            to right,
            #F3F1EA,
            rgba(243,241,234,0)
          );
        }

        .testimonial-fade-right {
          position: absolute;
          right: 0;
          top: 0;
          width: 90px;
          height: 100%;
          z-index: 5;
          pointer-events: none;
          background: linear-gradient(
            to left,
            #F3F1EA,
            rgba(243,241,234,0)
          );
        }

        @media (max-width: 760px) {
          .testimonial-fade-left,
          .testimonial-fade-right {
            width: 45px;
          }
        }
      `}</style>

      {/* ROW 1 */}
      <div className="testimonial-row">
        <div className="testimonial-fade-left" />

        <div className="testimonial-fade-right" />

        <div className="testimonial-track testimonial-marquee">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard
              key={`row1-${index}`}
              card={card}
            />
          ))}
        </div>
      </div>

      {/* ROW 2 */}
      <div className="testimonial-row">
        <div className="testimonial-fade-left" />

        <div className="testimonial-fade-right" />

        <div className="testimonial-track testimonial-marquee-reverse">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard
              key={`row2-${index}`}
              card={card}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TestimonialHover;