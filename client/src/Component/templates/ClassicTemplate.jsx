import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data = {}, accentColor, SortableSection }) => {
  /* ---------------- NORMALIZE DATA ---------------- */
  const personal = data.personal_info || {};
  const {
    full_name = "Your Name",
    profession = "",
    email = "",
    phone = "",
    location = "",
    linkedin = "",
    website = "",
  } = personal;

  const professional_summary = data.professional_summary || "";
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const education = Array.isArray(data.education) ? data.education : [];
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  const sectionOrder =
    data.sectionOrder || [
      "summary",
      "experience",
      "projects",
      "education",
      "skills",
    ];

  /* ---------------- HELPERS ---------------- */
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  /* ---------------- SECTION RENDERERS ---------------- */

  const sections = {
    summary:
      professional_summary && (
        <SortableSection id="summary">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap break-words">
              {professional_summary}
            </p>
          </section>
        </SortableSection>
      ),

    experience:
      experience.length > 0 && (
        <SortableSection id="experience">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
              PROFESSIONAL EXPERIENCE
            </h2>

            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="pl-4 border-l-4"
                  style={{ borderColor: accentColor }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                    </div>

                    <div className="text-sm text-gray-600">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-gray-700 whitespace-pre-wrap break-words">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </SortableSection>
      ),

    projects:
      projects.length > 0 && (
        <SortableSection id="projects">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
              PROJECTS
            </h2>

            <div className="space-y-3">
              {projects.map((proj, index) => (
                <div key={index} className="pl-4 border-l-4 border-gray-300">
                  <h3 className="font-semibold text-gray-800">{proj.name}</h3>
                  {proj.description && <p className="text-gray-600">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        </SortableSection>
      ),

    education:
      education.length > 0 && (
        <SortableSection id="education">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
              EDUCATION
            </h2>

            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>

                  <div className="text-sm text-gray-600">
                    {formatDate(edu.graduation_date)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </SortableSection>
      ),

    skills:
      skills.length > 0 && (
        <SortableSection id="skills">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
              CORE SKILLS
            </h2>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span key={index} className="text-gray-700">
                  • {skill}
                </span>
              ))}
            </div>
          </section>
        </SortableSection>
      ),
  };

  /* ---------------- JSX ---------------- */
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
      {/* Header (not draggable) */}
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
          {full_name}
        </h1>

        {profession && <p className="text-gray-700 font-medium mb-3">{profession}</p>}

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              {email}
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              {phone}
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              {location}
            </div>
          )}
          {linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="size-4" />
              {linkedin}
            </div>
          )}
          {website && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" />
              {website}
            </div>
          )}
        </div>
      </header>

      {/* 🔥 Dynamic draggable sections */}
      {sectionOrder.map((sectionKey) => sections[sectionKey])}
    </div>
  );
};

export default ClassicTemplate;
