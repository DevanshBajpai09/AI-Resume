import {
  Mail,
  User2Icon,
  Lock,
  ArrowLeftIcon,
  Check,
  ShieldCheck,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import api from "../configs/api";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/Features/authSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthSkeleton from "../Component/skeleton/AuthSkeleton";


const passwordChecks = {
  length: (p) => p.length >= 8,
  upper: (p) => /[A-Z]/.test(p),
  lower: (p) => /[a-z]/.test(p),
  number: (p) => /\d/.test(p),
  special: (p) => /[@$!%*?&]/.test(p),
};


const Login = () => {
  const query = new URLSearchParams(window.location.search);

  const { loading } = useSelector(
    (state) => state.auth
  );

  const isOnline = useSelector(
    (state) => state.network.isOnline
  );

  const urlState = query
    .get("state")
    ?.toLowerCase();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState(
    urlState || "login"
  );

  const [verifying, setVerifying] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  /* ============================================== */
  /* VERIFY EMAIL */
  /* ============================================== */

  const verifyEmail = async () => {
    const token = query.get("token");

    if (!token) return;

    try {
      setVerifying(true);

      await api.get(
        `/api/users/verify-email?token=${token}`
      );

      toast.success(
        "Email verified 🎉 Please login"
      );

      setState("login");

      window.history.replaceState(
        {},
        "",
        "/login"
      );

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Verification failed"
      );
    } finally {
      setVerifying(false);
    }
  };


  useEffect(() => {
    if (state === "verify") {
      verifyEmail();
    }

    // eslint-disable-next-line
  }, [state]);


  /* ============================================== */
  /* SUBMIT */
  /* ============================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    try {
      const { data } = await api.post(
        `/api/users/${state}`,
        formData
      );

      if (state === "login") {
        localStorage.setItem(
          "token",
          data.token
        );

        dispatch(
          login({
            token: data.token,
            user: data.user,
          })
        );

        toast.success("Login successful");

        navigate("/app");
      }

      if (state === "register") {
        toast.success(
          "Verification link sent to your email 📩"
        );

        setState("login");

        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message
      );
    } finally {
      setSubmitting(false);
    }
  };


  /* ============================================== */
  /* INPUT */
  /* ============================================== */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* ============================================== */
  /* GOOGLE LOGIN */
  /* ============================================== */

  const handleGoogleLogin = () => {
    window.location.href =
      `${import.meta.env.VITE_BACKEND_URL}/api/users/google`;
  };


  /* ============================================== */
  /* GITHUB LOGIN */
  /* ============================================== */

  const handleGithubLogin = () => {
    window.location.href =
      `${import.meta.env.VITE_BACKEND_URL}/api/users/github`;
  };


  /* ============================================== */
  /* LOADING */
  /* ============================================== */

  if (loading || !isOnline) {
    return (
      <AuthSkeleton
        showNameField={
          state === "register"
        }
      />
    );
  }


  /* ============================================== */
  /* VERIFY SCREEN */
  /* ============================================== */

  if (state === "verify") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#FBFAF6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "430px",
            borderTop:
              "1px solid #DFDACC",
            borderBottom:
              "1px solid #DFDACC",
            padding: "42px 25px",
            textAlign: "center",
            background: "#FFFFFF",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              border:
                "1px solid #DFDACC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <ShieldCheck
              size={22}
              color="#C63B26"
              strokeWidth={1.5}
            />
          </div>

          <div
            style={{
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "9px",
              color: "#C63B26",
              textTransform: "uppercase",
              letterSpacing: ".1em",
              marginBottom: "8px",
            }}
          >
            Account verification
          </div>

          <h2
            style={{
              fontFamily:
                "'Newsreader', serif",
              fontSize: "28px",
              fontWeight: 500,
              color: "#171B24",
              margin: 0,
            }}
          >
            Verifying your email
          </h2>

          <p
            style={{
              fontSize: "12px",
              color: "#5B6070",
              marginTop: "8px",
            }}
          >
            Please wait a moment while we
            confirm your email address.
          </p>

          <div
            style={{
              width: "100%",
              height: "2px",
              background: "#E8E5DD",
              marginTop: "25px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "45%",
                height: "100%",
                background: "#C63B26",
                animation:
                  "verificationProgress 1.3s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes verificationProgress {
            0% {
              transform: translateX(-120%);
            }

            100% {
              transform: translateX(300%);
            }
          }
        `}</style>
      </div>
    );
  }


  /* ============================================== */
  /* PASSWORD CHECKS */
  /* ============================================== */

  const password =
    formData.password;

  const checks = {
    length:
      passwordChecks.length(password),

    upper:
      passwordChecks.upper(password),

    lower:
      passwordChecks.lower(password),

    number:
      passwordChecks.number(password),

    special:
      passwordChecks.special(password),
  };

  const isLogin =
    state === "login";


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FBFAF6",
        color: "#171B24",
      }}
    >

      {/* ========================================== */}
      {/* TOP NAV */}
      {/* ========================================== */}

      <header
        style={{
          height: "70px",
          borderBottom:
            "1px solid #DFDACC",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding:
            "0 clamp(20px, 5vw, 70px)",
        }}
      >

        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            textDecoration: "none",
            color: "#171B24",
          }}
        >
          <div
            style={{
              width: "27px",
              height: "27px",
              border:
                "1px solid #171B24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            R
          </div>

          <span
            style={{
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "10px",
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            Resume Builder
          </span>
        </Link>


        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none",
            fontFamily:
              "'IBM Plex Mono', monospace",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: ".06em",
            color: "#5B6070",
          }}
        >
          <ArrowLeftIcon size={13} />

          Back home
        </Link>

      </header>


      {/* ========================================== */}
      {/* MAIN */}
      {/* ========================================== */}

      <main
        style={{
          minHeight:
            "calc(100vh - 70px)",
          display: "flex",
          justifyContent:
            "center",
          alignItems:
            "flex-start",
          padding:
            "65px 20px 80px",
        }}
      >

        <div
          style={{
            width: "100%",
            maxWidth:
              isLogin
                ? "430px"
                : "470px",
          }}
        >

          {/* ====================================== */}
          {/* HEADER */}
          {/* ====================================== */}

          <div
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >

            <div
              style={{
                fontFamily:
                  "'IBM Plex Mono', monospace",
                fontSize: "9px",
                color: "#C63B26",
                textTransform:
                  "uppercase",
                letterSpacing: ".12em",
                marginBottom: "8px",
              }}
            >
              {isLogin
                ? "Welcome back"
                : "Create your account"}
            </div>


            <h1
              style={{
                fontFamily:
                  "'Newsreader', serif",
                fontSize:
                  "clamp(34px, 6vw, 45px)",
                lineHeight: 1,
                fontWeight: 500,
                margin: 0,
                color: "#171B24",
              }}
            >
              {isLogin
                ? "Welcome back."
                : "Start your resume."}
            </h1>


            <p
              style={{
                fontFamily:
                  "Inter, sans-serif",
                fontSize: "12px",
                color: "#5B6070",
                marginTop: "10px",
                lineHeight: 1.6,
              }}
            >
              {isLogin
                ? "Sign in to continue building your next opportunity."
                : "Create an account and turn your experience into a stronger resume."}
            </p>

          </div>


          {/* ====================================== */}
          {/* FORM */}
          {/* ====================================== */}

          <form
            onSubmit={handleSubmit}
            style={{
              background: "#FFFFFF",
              border:
                "1px solid #DFDACC",
            }}
          >

            {/* FORM TOP LABEL */}

            <div
              style={{
                padding:
                  "13px 17px",
                borderBottom:
                  "1px solid #DFDACC",
                background:
                  "#F7F6F1",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
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
                  letterSpacing:
                    ".07em",
                }}
              >
                {isLogin
                  ? "Account login"
                  : "New account"}
              </span>


              <span
                style={{
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "8px",
                  color: "#C63B26",
                }}
              >
                {isLogin
                  ? "01 / 01"
                  : "01 / 02"}
              </span>

            </div>


            <div
              style={{
                padding:
                  "25px 25px 22px",
              }}
            >

              {/* ================================= */}
              {/* SOCIAL LOGIN */}
              {/* ================================= */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >

                {/* GOOGLE */}

                <button
                  type="button"
                  onClick={
                    handleGoogleLogin
                  }
                  style={{
                    width: "100%",
                    height: "45px",
                    background:
                      "#FFFFFF",
                    border:
                      "1px solid #CFCBBC",
                    color: "#171B24",
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "9px",
                    textTransform:
                      "uppercase",
                    letterSpacing:
                      ".06em",
                    cursor: "pointer",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    gap: "8px",
                    transition:
                      "all .15s ease",
                  }}

                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "#171B24";
                    e.currentTarget.style.background =
                      "#F7F6F1";
                  }}

                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "#CFCBBC";
                    e.currentTarget.style.background =
                      "#FFFFFF";
                  }}
                >

                  {/* Google Icon */}

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />

                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />

                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />

                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>

                  Google

                </button>


                {/* GITHUB */}

                <button
                  type="button"
                  onClick={
                    handleGithubLogin
                  }
                  style={{
                    width: "100%",
                    height: "45px",
                    background:
                      "#FFFFFF",
                    border:
                      "1px solid #CFCBBC",
                    color: "#171B24",
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "9px",
                    textTransform:
                      "uppercase",
                    letterSpacing:
                      ".06em",
                    cursor: "pointer",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    gap: "8px",
                    transition:
                      "all .15s ease",
                  }}

                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "#171B24";
                    e.currentTarget.style.background =
                      "#F7F6F1";
                  }}

                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "#CFCBBC";
                    e.currentTarget.style.background =
                      "#FFFFFF";
                  }}
                >

                  {/* GitHub Icon */}

                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="#171B24"
                  >
                    <path
                      d="M12 .7C5.7.7.6 5.8.6 12.1c0 5 3.3 9.3 7.8 10.8.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.1 1.2.9-.3 1.9-.4 2.8-.4 1 0 1.9.1 2.8.4C17 4.7 18 5 18 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.1v3.2c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.8C23.4 5.8 18.3.7 12 .7z"
                    />
                  </svg>

                  GitHub

                </button>

              </div>


              {/* ================================= */}
              {/* OR DIVIDER */}
              {/* ================================= */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >

                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "#DFDACC",
                  }}
                />

                <span
                  style={{
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "8px",
                    color: "#8A8F9B",
                    textTransform:
                      "uppercase",
                    letterSpacing:
                      ".08em",
                  }}
                >
                  Or
                </span>

                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "#DFDACC",
                  }}
                />

              </div>


              {/* ================================= */}
              {/* NAME */}
              {/* ================================= */}

              {!isLogin && (
                <EditorialInput
                  label="Full name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  icon={User2Icon}
                  required
                />
              )}


              {/* ================================= */}
              {/* EMAIL */}
              {/* ================================= */}

              <EditorialInput
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                icon={Mail}
                required
                first={isLogin}
              />


              {/* ================================= */}
              {/* PASSWORD */}
              {/* ================================= */}

              <EditorialInput
                label="Password"
                name="password"
                type="password"
                placeholder={
                  isLogin
                    ? "Your password"
                    : "Create a strong password"
                }
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                icon={Lock}
                required
              />


              {/* ================================= */}
              {/* FORGOT PASSWORD */}
              {/* ================================= */}

              {isLogin && (
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "flex-end",
                    marginTop: "8px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      toast(
                        "Forgot password flow coming soon 🔐"
                      )
                    }
                    style={{
                      border: "none",
                      background:
                        "transparent",
                      padding: 0,
                      fontFamily:
                        "'IBM Plex Mono', monospace",
                      fontSize: "8px",
                      color: "#5B6070",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        ".04em",
                      cursor:
                        "pointer",
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}


              {/* ================================= */}
              {/* PASSWORD RULES */}
              {/* ================================= */}

              {!isLogin && (
                <div
                  style={{
                    marginTop: "15px",
                    padding:
                      "13px 14px",
                    background:
                      "#F7F6F1",
                    border:
                      "1px solid #DFDACC",
                  }}
                >

                  <div
                    style={{
                      fontFamily:
                        "'IBM Plex Mono', monospace",
                      fontSize: "8px",
                      color: "#5B6070",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        ".06em",
                      marginBottom:
                        "9px",
                    }}
                  >
                    Password requirements
                  </div>


                  <div
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap: "7px",
                    }}
                  >

                    {Object.entries({
                      "8+ characters":
                        checks.length,

                      "Uppercase letter":
                        checks.upper,

                      "Lowercase letter":
                        checks.lower,

                      Number:
                        checks.number,

                      "Special character":
                        checks.special,

                    }).map(
                      ([label, ok]) => (

                        <div
                          key={label}
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: "6px",
                            fontFamily:
                              "'IBM Plex Mono', monospace",
                            fontSize:
                              "8px",
                            color:
                              ok
                                ? "#2D7A50"
                                : "#8A8F9B",
                          }}
                        >

                          <span
                            style={{
                              width:
                                "14px",
                              height:
                                "14px",
                              border:
                                ok
                                  ? "1px solid #2D7A50"
                                  : "1px solid #CFCBBC",
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              flexShrink:
                                0,
                            }}
                          >
                            {ok && (
                              <Check
                                size={9}
                              />
                            )}
                          </span>

                          {label}

                        </div>

                      )
                    )}

                  </div>

                </div>
              )}


              {/* ================================= */}
              {/* SUBMIT */}
              {/* ================================= */}

              <button
                type="submit"
                disabled={
                  submitting
                }
                style={{
                  width: "100%",
                  height: "45px",
                  marginTop: "20px",
                  border:
                    "1px solid #171B24",
                  background:
                    submitting
                      ? "#5B6070"
                      : "#171B24",
                  color: "#FFFFFF",
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: "9px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    ".08em",
                  cursor:
                    submitting
                      ? "wait"
                      : "pointer",
                  transition:
                    "all .15s ease",
                }}

                onMouseEnter={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.background =
                      "#C63B26";

                    e.currentTarget.style.borderColor =
                      "#C63B26";
                  }
                }}

                onMouseLeave={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.background =
                      "#171B24";

                    e.currentTarget.style.borderColor =
                      "#171B24";
                  }
                }}
              >
                {submitting
                  ? "Please wait..."
                  : isLogin
                  ? "Sign in"
                  : "Create account"}
              </button>


              {/* ================================= */}
              {/* SWITCH */}
              {/* ================================= */}

              <div
                style={{
                  textAlign:
                    "center",
                  marginTop:
                    "19px",
                  paddingTop:
                    "17px",
                  borderTop:
                    "1px solid #DFDACC",
                }}
              >

                <span
                  style={{
                    fontSize: "10px",
                    color: "#8A8F9B",
                  }}
                >
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </span>


                <button
                  type="button"
                  onClick={() =>
                    setState(
                      isLogin
                        ? "register"
                        : "login"
                    )
                  }
                  style={{
                    border: "none",
                    background:
                      "transparent",
                    marginLeft: "6px",
                    padding: 0,
                    color: "#C63B26",
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "9px",
                    textTransform:
                      "uppercase",
                    letterSpacing:
                      ".04em",
                    cursor:
                      "pointer",
                  }}
                >
                  {isLogin
                    ? "Create account"
                    : "Sign in"}
                </button>

              </div>

            </div>

          </form>


          {/* ====================================== */}
          {/* BOTTOM NOTE */}
          {/* ====================================== */}

          <div
            style={{
              textAlign:
                "center",
              marginTop: "17px",
              fontFamily:
                "'IBM Plex Mono', monospace",
              fontSize: "8px",
              color: "#8A8F9B",
              textTransform:
                "uppercase",
              letterSpacing:
                ".04em",
              lineHeight: 1.6,
            }}
          >
            {isLogin
              ? "Your resume drafts are saved securely."
              : "By creating an account, you can save and tailor your resumes."}
          </div>

        </div>

      </main>


      <style>{`

        * {
          box-sizing: border-box;
        }

        input::placeholder {
          color: #A1A4AC;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #171B24;
          -webkit-box-shadow:
            0 0 0px 1000px #FBFAF6 inset;
          transition:
            background-color 5000s ease-in-out 0s;
        }

        @media (max-width: 480px) {

          header {
            height: 60px !important;
          }

          main {
            padding-top: 40px !important;
          }

          form > div:last-child {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

        }

      `}</style>

    </div>
  );
};


/* ================================================== */
/* EDITORIAL INPUT */
/* ================================================== */

const EditorialInput = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  required,
  first,
}) => {

  return (
    <div
      style={{
        marginTop: first
          ? "0"
          : "18px",
      }}
    >

      <label
        htmlFor={name}
        style={{
          display: "flex",
          alignItems:
            "center",
          gap: "7px",
          fontFamily:
            "'IBM Plex Mono', monospace",
          fontSize: "9px",
          color: "#5B6070",
          textTransform:
            "uppercase",
          letterSpacing:
            ".06em",
          marginBottom:
            "7px",
        }}
      >

        <Icon
          size={12}
          strokeWidth={1.5}
        />

        {label}

        {required && (
          <span
            style={{
              color: "#C63B26",
            }}
          >
            *
          </span>
        )}

      </label>


      <div
        style={{
          position:
            "relative",
        }}
      >

        <input
          id={name}
          name={name}
          type={type}
          placeholder={
            placeholder
          }
          value={value}
          onChange={
            onChange
          }
          required={
            required
          }
          style={{
            width: "100%",
            height: "44px",
            padding:
              "0 12px",
            border:
              "1px solid #CFCBBC",
            background:
              "#FBFAF6",
            color: "#171B24",
            outline: "none",
            fontFamily:
              "Inter, sans-serif",
            fontSize: "12px",
            transition:
              "border-color .15s ease, background .15s ease",
          }}

          onFocus={(e) => {
            e.currentTarget.style.borderColor =
              "#171B24";

            e.currentTarget.style.background =
              "#FFFFFF";
          }}

          onBlur={(e) => {
            e.currentTarget.style.borderColor =
              "#CFCBBC";

            e.currentTarget.style.background =
              "#FBFAF6";
          }}
        />

      </div>

    </div>
  );
};


export default Login;