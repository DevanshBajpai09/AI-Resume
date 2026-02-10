import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data = {}, accentColor, SortableSection }) => {
  /* ---------------- HELPERS ---------------- */
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const sectionOrder =
    data.sectionOrder || ["summary", "experience", "projects", "education", "skills"];

  /* ---------------- SECTION RENDERERS ---------------- */
  const sections = {
    summary:
      data.professional_summary && (
        <SortableSection id="summary">
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
              Professional Summary
            </h2>
            <p className="text-gray-700 break-words whitespace-pre-wrap">
              {data.professional_summary}
            </p>
          </section>
        </SortableSection>
      ),

    experience:
      data.experience?.length > 0 && (
        <SortableSection id="experience">
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
              Experience
            </h2>

            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
                      <p className="font-medium" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
                    </div>

                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>

                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-wrap break-words">
                      {exp.description}
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
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
              Projects
            </h2>

            <div className="space-y-6">
              {data.projects.map((p, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-200"
                  style={{ borderLeftColor: accentColor }}
                >
                  <h3 className="text-lg font-medium text-gray-900">{p.name}</h3>

                  {p.description && (
                    <div className="text-gray-700 leading-relaxed text-sm mt-3">
                      {p.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </SortableSection>
      ),

    education:
      data.education?.length > 0 && (
        <SortableSection id="education">
          <section>
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
              Education
            </h2>

            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p style={{ color: accentColor }}>{edu.institution}</p>

                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{formatDate(edu.graduation_date)}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </SortableSection>
      ),

    skills:
      data.skills?.length > 0 && (
        <SortableSection id="skills">
          <section>
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm text-white rounded-full"
                  style={{ backgroundColor: accentColor }}
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
    <div className="max-w-4xl mx-auto bg-white text-gray-800">
      {/* HEADER (not draggable) */}
      <header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
        <h1 className="text-4xl font-light mb-3">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-4" />
              {data.personal_info.email}
            </div>
          )}

          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-4" />
              {data.personal_info.phone}
            </div>
          )}

          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              {data.personal_info.location}
            </div>
          )}

          {data.personal_info?.linkedin && (
            <a href={data.personal_info.linkedin} target="_blank" className="flex items-center gap-2">
              <Linkedin className="size-4" />
              <span className="break-all text-xs">
                {data.personal_info.linkedin.replace("https://www.", "")}
              </span>
            </a>
          )}

          {data.personal_info?.website && (
            <a href={data.personal_info.website} target="_blank" className="flex items-center gap-2">
              <Globe className="size-4" />
              <span className="break-all text-xs">
                {data.personal_info.website.replace("https://", "")}
              </span>
            </a>
          )}
        </div>
      </header>

      {/* BODY */}
      <div className="p-8">
        {/* 🔥 Dynamic draggable sections */}
        {sectionOrder.map((key) => sections[key])}
      </div>
    </div>
  );
};

export default ModernTemplate;
