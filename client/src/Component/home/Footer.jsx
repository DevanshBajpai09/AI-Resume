import React from "react";

const Footer = () => {
  return (
    <>
      <footer
        style={{
          padding: "50px 96px 40px",
          borderTop: "1px solid #DFDACC",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: "30px",
          position: "relative",
          zIndex: 2,
          fontSize: "13.5px",
          fontFamily: "'Inter', sans-serif",
          color: "#171B24",
          background: "#FBFAF6",
        }}
      >

        {/* Brand */}
        <div>
          <a
            href="/"
            style={{
              display: "inline-block",
              fontFamily: "'Newsreader', serif",
              fontStyle: "italic",
              fontSize: "22px",
              fontWeight: 500,
              color: "#171B24",
              textDecoration: "none",
              marginBottom: "10px",
            }}
          >
            resume<span style={{ color: "#C63B26" }}>.</span>
          </a>

          <p
            style={{
              color: "#5B6070",
              maxWidth: "220px",
              lineHeight: 1.6,
              fontSize: "13px",
              margin: 0,
            }}
          >
            An AI editor for your resume — built to mark up,
            not template over, the work you've already done.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#5B6070",
              margin: "0 0 14px",
              fontWeight: 500,
            }}
          >
            Product
          </h4>

          <a
            href="#process"
            style={linkStyle}
          >
            How it works
          </a>

          <a
            href="#features"
            style={linkStyle}
          >
            Features
          </a>

          <a
            href="/pricing"
            style={linkStyle}
          >
            Pricing
          </a>
        </div>

        {/* Resources */}
        <div>
          <h4
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#5B6070",
              margin: "0 0 14px",
              fontWeight: 500,
            }}
          >
            Resources
          </h4>

          <a
            href="/resume-examples"
            style={linkStyle}
          >
            Sample resumes
          </a>

          <a
            href="/blog"
            style={linkStyle}
          >
            Blog
          </a>

          <a
            href="/careers"
            style={linkStyle}
          >
            Careers
          </a>
        </div>

        {/* Legal */}
        <div>
          <h4
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#5B6070",
              margin: "0 0 14px",
              fontWeight: 500,
            }}
          >
            Legal
          </h4>

          <a
            href="/privacy"
            style={linkStyle}
          >
            Privacy
          </a>

          <a
            href="/terms"
            style={linkStyle}
          >
            Terms
          </a>
        </div>

      </footer>

      {/* Bottom copyright */}
      <div
        style={{
          padding: "22px 96px 40px",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "11px",
          color: "#5B6070",
          background: "#FBFAF6",
        }}
      >
        © 2026 resume. — Made for people rewriting their story,
        one line at a time.
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 760px) {
          footer {
            grid-template-columns: 1fr 1fr !important;
            padding: 40px 24px 34px 52px !important;
          }

          .footer-bottom {
            padding: 20px 24px 34px 52px !important;
          }
        }

        @media (max-width: 500px) {
          footer {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </>
  );
};

const linkStyle = {
  display: "block",
  color: "#5B6070",
  marginBottom: "10px",
  textDecoration: "none",
  fontFamily: "'Inter', sans-serif",
  fontSize: "13.5px",
  transition: "color .15s ease",
};

export default Footer;