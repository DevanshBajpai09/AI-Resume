import {
  BriefcaseBusinessIcon,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  Upload,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const PersonalInfo = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const [imagePreview, setImagePreview] =
    useState(null);

  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // Create image preview safely
  useEffect(() => {
    if (!data?.image) {
      setImagePreview(null);
      return;
    }

    if (typeof data.image === "string") {
      setImagePreview(data.image);
      return;
    }

    const url = URL.createObjectURL(data.image);
    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [data?.image]);

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email address",
      icon: Mail,
      type: "email",
      required: true,
    },
    {
      key: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
      required: true,
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
      required: true,
    },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusinessIcon,
      type: "text",
      required: true,
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      icon: Linkedin,
      type: "url",
      required: false,
    },
    {
      key: "website",
      label: "Personal Website",
      icon: Globe,
      type: "url",
      required: false,
    },
  ];

  return (
    <div
      style={{
        background: "#FBFAF6",
        color: "#171B24",
        minHeight: "100%",
      }}
    >
      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div
        style={{
          paddingBottom: "20px",
          borderBottom: "1px solid #DFDACC",
        }}
      >
        <div
          style={{
            fontFamily:
              "'IBM Plex Mono', monospace",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            color: "#C63B26",
            marginBottom: "5px",
          }}
        >
          § 01 / Identity
        </div>

        <h3
          style={{
            margin: 0,
            fontFamily:
              "'Newsreader', serif",
            fontSize: "27px",
            fontWeight: 500,
            color: "#171B24",
          }}
        >
          Personal Information
        </h3>

        <p
          style={{
            margin:
              "5px 0 0",
            fontFamily:
              "system-ui, sans-serif",
            fontSize: "12px",
            color: "#5B6070",
            lineHeight: 1.5,
          }}
        >
          Add the information recruiters need
          to identify and contact you.
        </p>
      </div>

      {/* ========================================== */}
      {/* PROFILE IMAGE */}
      {/* ========================================== */}

      <div
        style={{
          padding:
            "20px 0",
          borderBottom:
            "1px solid #DFDACC",
        }}
      >
        <div
          style={{
            fontFamily:
              "'IBM Plex Mono', monospace",
            fontSize: "9px",
            color: "#5B6070",
            textTransform:
              "uppercase",
            letterSpacing: ".06em",
            marginBottom: "11px",
          }}
        >
          Profile image
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {/* IMAGE */}

          <label
            htmlFor="profile-image"
            style={{
              width: "68px",
              height: "68px",
              flexShrink: 0,
              border:
                "1px solid #CFCBBC",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit:
                    "cover",
                }}
              />
            ) : (
              <User
                size={25}
                strokeWidth={1}
                color="#8A8F9B"
              />
            )}

            <input
              id="profile-image"
              type="file"
              accept="image/jpeg,image/png"
              style={{
                display: "none",
              }}
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                if (file) {
                  handleChange(
                    "image",
                    file
                  );
                }
              }}
            />
          </label>

          {/* UPLOAD INFO */}

          <div>
            <label
              htmlFor="profile-image"
              style={{
                display:
                  "inline-flex",
                alignItems:
                  "center",
                gap: "6px",
                padding:
                  "7px 10px",
                border:
                  "1px solid #DFDACC",
                background:
                  "#FFFFFF",
                color:
                  "#171B24",
                fontFamily:
                  "'IBM Plex Mono', monospace",
                fontSize: "8px",
                textTransform:
                  "uppercase",
                letterSpacing:
                  ".04em",
                cursor:
                  "pointer",
              }}
            >
              <Upload size={12} />
              {imagePreview
                ? "Change image"
                : "Upload image"}
            </label>

            <p
              style={{
                margin:
                  "6px 0 0",
                fontSize: "10px",
                color:
                  "#8A8F9B",
              }}
            >
              JPG or PNG · Recommended
              square image
            </p>
          </div>
        </div>

        {/* REMOVE BACKGROUND */}

        {typeof data?.image ===
          "object" &&
          data?.image && (
            <div
              style={{
                marginTop:
                  "15px",
                paddingTop:
                  "12px",
                borderTop:
                  "1px solid #E8E5DC",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "11px",
                    fontWeight: 500,
                    color:
                      "#171B24",
                  }}
                >
                  Remove background
                </p>

                <p
                  style={{
                    margin:
                      "3px 0 0",
                    fontSize: "9px",
                    color:
                      "#8A8F9B",
                  }}
                >
                  Clean up the profile
                  image automatically.
                </p>
              </div>

              {/* SWITCH */}

              <label
                style={{
                  position:
                    "relative",
                  width: "36px",
                  height: "20px",
                  cursor:
                    "pointer",
                  flexShrink: 0,
                }}
              >
                <input
                  type="checkbox"
                  checked={
                    removeBackground
                  }
                  onChange={() =>
                    setRemoveBackground(
                      (prev) =>
                        !prev
                    )
                  }
                  style={{
                    display:
                      "none",
                  }}
                />

                <span
                  style={{
                    position:
                      "absolute",
                    inset: 0,
                    background:
                      removeBackground
                        ? "#C63B26"
                        : "#CFCBC0",
                    transition:
                      "all .2s ease",
                  }}
                />

                <span
                  style={{
                    position:
                      "absolute",
                    width: "14px",
                    height: "14px",
                    top: "3px",
                    left:
                      removeBackground
                        ? "19px"
                        : "3px",
                    background:
                      "#FFFFFF",
                    transition:
                      "all .2s ease",
                  }}
                />
              </label>
            </div>
          )}
      </div>

      {/* ========================================== */}
      {/* FORM FIELDS */}
      {/* ========================================== */}

      <div
        style={{
          paddingTop:
            "20px",
        }}
      >
        {fields.map(
          (field) => {
            const Icon =
              field.icon;

            return (
              <div
                key={field.key}
                style={{
                  marginBottom:
                    "18px",
                }}
              >
                {/* LABEL */}

                <label
                  htmlFor={field.key}
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: "6px",
                    marginBottom:
                      "7px",
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    fontSize: "8px",
                    textTransform:
                      "uppercase",
                    letterSpacing:
                      ".05em",
                    color:
                      "#5B6070",
                  }}
                >
                  <Icon
                    size={12}
                    strokeWidth={1.5}
                  />

                  {field.label}

                  {field.required && (
                    <span
                      style={{
                        color:
                          "#C63B26",
                      }}
                    >
                      *
                    </span>
                  )}
                </label>

                {/* INPUT */}

                <input
                  id={field.key}
                  type={field.type}
                  value={
                    data?.[
                      field.key
                    ] || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      field.key,
                      e.target.value
                    )
                  }
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  required={
                    field.required
                  }
                  style={{
                    width: "100%",
                    boxSizing:
                      "border-box",
                    height: "42px",
                    padding:
                      "0 12px",
                    border:
                      "1px solid #CFCBBC",
                    borderRadius:
                      "0px",
                    outline: "none",
                    background:
                      "#FFFFFF",
                    color:
                      "#171B24",
                    fontSize:
                      "12px",
                    fontFamily:
                      "system-ui, sans-serif",
                    transition:
                      "border-color .15s ease, box-shadow .15s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor =
                      "#C63B26";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(198,59,38,.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor =
                      "#CFCBBC";
                    e.target.style.boxShadow =
                      "none";
                  }}
                />
              </div>
            );
          }
        )}
      </div>

      {/* ========================================== */}
      {/* FOOTNOTE */}
      {/* ========================================== */}

      <div
        style={{
          marginTop:
            "5px",
          padding:
            "12px 13px",
          background:
            "#F4EDE7",
          borderLeft:
            "2px solid #C63B26",
        }}
      >
        <div
          style={{
            fontFamily:
              "'IBM Plex Mono', monospace",
            fontSize: "8px",
            color:
              "#8B4A32",
            textTransform:
              "uppercase",
            letterSpacing:
              ".05em",
          }}
        >
          Editor's note
        </div>

        <p
          style={{
            margin:
              "4px 0 0",
            fontSize: "10px",
            lineHeight: 1.5,
            color:
              "#5B6070",
          }}
        >
          Keep your contact details
          accurate. These are the first
          details recruiters use when
          reaching out.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfo;