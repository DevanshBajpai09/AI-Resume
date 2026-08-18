import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/Features/authSlice";
import { Sparkles, ChevronDown } from "lucide-react";
import NavbarSkeleton from "./skeleton/NavbarSkeleton";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const { user, loading } = useSelector(
    (state) => state.auth
  );

  const isOnline = useSelector(
    (state) => state.network.isOnline
  );

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

 const logoutAction = () => {
  localStorage.removeItem("token");
  dispatch(logout());

  console.log("LOGOUT → navigating home");

  window.location.href = "/";
};

  useEffect(() => {
    const handler = (e) => {
      if (
        !dropdownRef.current?.contains(
          e.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );
  }, []);

  if (loading || !isOnline) {
    return <NavbarSkeleton />;
  }

  return (
    <>
      <header
        style={{
          background: "#FBFAF6",
          borderBottom:
            "1px solid #DFDACC",
          color: "#171B24",
          position: "relative",
          zIndex: 50,
        }}
      >
        <nav
          style={{
            maxWidth: "1380px",
            height: "72px",
            margin: "0 auto",
            padding:
              "0 clamp(20px, 4vw, 60px)",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
          }}
        >
          {/* ================================= */}
          {/* LOGO */}
          {/* ================================= */}

          <Link
            to="/app"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src="/logo.svg"
              alt="Resume Builder"
              style={{
                height: "38px",
                width: "auto",
              }}
            />
          </Link>

          {/* ================================= */}
          {/* RIGHT SIDE */}
          {/* ================================= */}

          {user && (
            <div
              ref={dropdownRef}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                position: "relative",
              }}
            >
              {/* ================================= */}
              {/* NOTIFICATION */}
              {/* ================================= */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  width: "34px",
                  height: "34px",
                }}
              >
                <NotificationBell />
              </div>

              {/* Divider */}

              <div
                style={{
                  width: "1px",
                  height: "25px",
                  background:
                    "#DFDACC",
                }}
              />

              {/* ================================= */}
              {/* PREMIUM */}
              {/* ================================= */}

              {user.isPremium && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding:
                      "6px 9px",
                    border:
                      "1px solid #D8C6B8",
                    background:
                      "#F4EDE7",
                    color: "#8B4A32",
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "8px",
                    letterSpacing:
                      ".07em",
                  }}
                >
                  <Sparkles
                    size={12}
                    strokeWidth={1.5}
                  />

                  PREMIUM
                </div>
              )}

              {/* ================================= */}
              {/* PROFILE BUTTON */}
              {/* ================================= */}

              <button
                type="button"
                onClick={() =>
                  setOpen(!open)
                }
                style={{
                  border: "none",
                  background:
                    "transparent",
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "7px",
                  cursor: "pointer",
                  color: "#171B24",
                  padding: "5px 0",
                }}
              >
                <div
                  style={{
                    width: "29px",
                    height: "29px",
                    border:
                      "1px solid #CFCBC0",
                    background:
                      "#FFFFFF",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    fontFamily:
                      "'Newsreader', serif",
                    fontSize: "15px",
                    color: "#C63B26",
                  }}
                >
                  {user?.name
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                <span
                  className="navbar-user-name"
                  style={{
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "9px",
                    textTransform:
                      "uppercase",
                    letterSpacing:
                      ".04em",
                  }}
                >
                  {user.name}
                </span>

                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  style={{
                    transition:
                      "transform .2s ease",
                    transform: open
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                />
              </button>

              {/* ================================= */}
              {/* DROPDOWN */}
              {/* ================================= */}

              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "55px",
                  width: "205px",
                  background:
                    "#FBFAF6",
                  border:
                    "1px solid #DFDACC",
                  boxShadow:
                    "0 18px 40px rgba(23,27,36,.10)",
                  transformOrigin:
                    "top right",
                  transform: open
                    ? "scale(1)"
                    : "scale(.96)",
                  opacity: open
                    ? 1
                    : 0,
                  pointerEvents: open
                    ? "auto"
                    : "none",
                  transition:
                    "all .18s ease",
                }}
              >
                {/* Dropdown heading */}

                <div
                  style={{
                    padding:
                      "13px 15px 11px",
                    borderBottom:
                      "1px solid #DFDACC",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        "'IBM Plex Mono', monospace",
                      fontSize: "7px",
                      color:
                        "#C63B26",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        ".09em",
                    }}
                  >
                    Account
                  </div>

                  <div
                    style={{
                      marginTop: "3px",
                      fontFamily:
                        "'Newsreader', serif",
                      fontSize: "18px",
                      color:
                        "#171B24",
                    }}
                  >
                    {user.name}
                  </div>
                </div>

                {/* Profile */}

                <Link
                  to="/app/profile"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="navbar-menu-item"
                >
                  <span>
                    My Profile
                  </span>

                  <span className="navbar-arrow">
                    →
                  </span>
                </Link>

                {/* Transactions */}

                <Link
                  to="/app/transactions"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="navbar-menu-item"
                >
                  <span>
                    Transactions
                  </span>

                  <span className="navbar-arrow">
                    →
                  </span>
                </Link>

                {/* Analytics */}

                <Link
                  to="/app/analytics"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="navbar-menu-item"
                >
                  <span>
                    Analytics
                  </span>

                  <span className="navbar-arrow">
                    →
                  </span>
                </Link>

                {/* Interview */}

                <a
                  href="https://ai-interview-area.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="navbar-menu-item"
                >
                  <span>
                    Interview
                  </span>

                  <span className="navbar-arrow">
                    ↗
                  </span>
                </a>

                {/* Divider */}

                <div
                  style={{
                    height: "1px",
                    background:
                      "#DFDACC",
                    margin:
                      "5px 0",
                  }}
                />

                {/* Logout */}

                <button
                  type="button"
                  onClick={
                    logoutAction
                  }
                  className="navbar-logout"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* ===================================== */}
      {/* NAVBAR STYLES */}
      {/* ===================================== */}

      <style>{`
        .navbar-menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
          padding: 10px 15px;
          color: #5B6070;
          text-decoration: none;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: .04em;
          transition:
            background .15s ease,
            color .15s ease,
            padding .15s ease;
        }

        .navbar-menu-item:hover {
          background: #F1EFE8;
          color: #171B24;
          padding-left: 18px;
        }

        .navbar-arrow {
          color: #A4A7AF;
          font-size: 11px;
          transition: transform .15s ease;
        }

        .navbar-menu-item:hover .navbar-arrow {
          transform: translateX(2px);
          color: #C63B26;
        }

        .navbar-logout {
          width: 100%;
          border: none;
          background: transparent;
          text-align: left;
          padding: 11px 15px;
          color: #C63B26;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: .04em;
          cursor: pointer;
          transition:
            background .15s ease,
            padding .15s ease;
        }

        .navbar-logout:hover {
          background: #F8EDEA;
          padding-left: 18px;
        }

        @media (max-width: 600px) {
          .navbar-user-name {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;