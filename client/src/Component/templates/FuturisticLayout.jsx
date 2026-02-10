import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ChevronRight,
  Award,
  Code,
  Briefcase,
  GraduationCap,
  Sparkles
} from "lucide-react";

const FuturisticTemplate = ({
  data = {},
  accentColor = "#3B82F6",
  SortableSection
}) => {
  /* ---------------- HELPERS ---------------- */
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  /* ---------------- SECTION ORDER ---------------- */
  const sectionOrder =
    data.sectionOrder || ["summary", "experience", "projects", "education", "skills"];

  /* ---------------- SECTIONS ---------------- */
  const sections = {
    summary:
      data.professional_summary && (
        <SortableSection id="summary">
          <section className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5" style={{ color: accentColor }} />
              <h2 className="text-xl font-semibold">Professional Summary</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
              {data.professional_summary}
            </p>
          </section>
        </SortableSection>
      ),

    experience:
      data.experience?.length > 0 && (
        <SortableSection id="experience">
          <section className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5" style={{ color: accentColor }} />
              <h2 className="text-xl font-semibold">Experience</h2>
            </div>

            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} className="pl-4 border-l border-white/20">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-sm font-semibold">{exp.position}</h3>
                    <span className="text-xs text-gray-400">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>

                  <p className="text-sm" style={{ color: accentColor }}>
                    {exp.company}
                  </p>

                  {exp.description && (
                    <div className="mt-2 space-y-1 text-xs text-gray-300">
                      {exp.description.split("\n").map((line, i) => (
                        <div key={i} className="flex gap-2">
                          <ChevronRight
                            className="w-3 h-3 mt-1"
                            style={{ color: accentColor }}
                          />
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </SortableSection>
      ),

    projects:
      data.projects?.length > 0 && (
        <SortableSection id="projects">
          <section className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-5 h-5" style={{ color: accentColor }} />
              <h2 className="text-xl font-semibold">Projects</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.projects.map((proj, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <h3 className="text-sm font-semibold mb-1">{proj.name}</h3>
                  <p className="text-xs text-gray-300">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        </SortableSection>
      ),

    education:
      data.education?.length > 0 && (
        <SortableSection id="education">
          <section className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap
                className="w-5 h-5"
                style={{ color: accentColor }}
              />
              <h2 className="text-xl font-semibold">Education</h2>
            </div>

            <div className="space-y-3 text-sm">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-medium">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-xs" style={{ color: accentColor }}>
                    {edu.institution}
                  </p>
                  <span className="text-xs text-gray-400">
                    {formatDate(edu.graduation_date)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </SortableSection>
      ),

    skills:
      data.skills?.length > 0 && (
        <SortableSection id="skills">
          <section className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-semibold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </SortableSection>
      ),
  };

  /* ---------------- JSX ---------------- */
  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl overflow-hidden shadow-xl">
      {/* HEADER (not draggable) */}
      <header className="p-6 backdrop-blur-lg bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg">
            {data.personal_info?.image ? (
              typeof data.personal_info.image === "string" ? (
                <img
                  src={data.personal_info.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={URL.createObjectURL(data.personal_info.image)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <Sparkles className="w-8 h-8 text-white/30" />
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            <p className="text-lg text-gray-300 mt-1">
              {data.personal_info?.profession || "Professional"}
            </p>
          </div>
        </div>

        {/* CONTACT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
              <Mail className="w-4 h-4" style={{ color: accentColor }} />
              <span className="text-xs truncate">{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
              <Phone className="w-4 h-4" style={{ color: accentColor }} />
              <span className="text-xs">{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
              <MapPin className="w-4 h-4" style={{ color: accentColor }} />
              <span className="text-xs">{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
              <Linkedin className="w-4 h-4" style={{ color: accentColor }} />
              <span className="text-xs truncate">{data.personal_info.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {/* 🔥 DRAGGABLE BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 p-6 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {sectionOrder.map((key) =>
            ["summary", "experience", "projects"].includes(key)
              ? sections[key]
              : null
          )}
        </div>

        <div className="space-y-6">
          {sectionOrder.map((key) =>
            ["education", "skills"].includes(key)
              ? sections[key]
              : null
          )}
        </div>
      </div>
    </div>
  );
};

export default FuturisticTemplate;
