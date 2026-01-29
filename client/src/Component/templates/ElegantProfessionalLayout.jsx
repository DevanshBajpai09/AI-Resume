import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Award,
  Briefcase,
  BookOpen,
  Code2,
  Users,
  ArrowRight
} from "lucide-react";

const ElegantTemplate = ({ data, accentColor = "#8B5CF6" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-b from-gray-50 to-white shadow-lg">

      {/* Top Banner (reduced height) */}
      <div className="relative h-34">
        <div className="absolute inset-0" style={{ backgroundColor: accentColor }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {data.personal_info?.image && (
          <div className="absolute top-20 left-8 z-10">
            <div className="">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-xl">
                <img
                  src={
                    typeof data.personal_info.image === "string"
                      ? data.personal_info.image
                      : URL.createObjectURL(data.personal_info.image)
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: accentColor }}
              >
                <Award className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-16 px-8 pb-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start gap-6 mb-4">
            <div>
              <h1 className="text-3xl font-light text-gray-900">
                {data.personal_info?.full_name || "Your Name"}
              </h1>
              <p className="text-lg text-gray-600">
                {data.personal_info?.profession || "Professional"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {data.personal_info?.email && (
                <div className="flex items-center gap-2 p-2 border rounded-md min-w-0">
  <Mail className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
  <span className="truncate flex-1 text-sm">
    {data.personal_info.email}
  </span>
</div>
              )}
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2 p-2 border rounded-md">
                  <Phone className="w-4 h-4" style={{ color: accentColor }} />
                  <span>{data.personal_info.phone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            {data.personal_info?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {data.personal_info.location}
              </span>
            )}
            {data.personal_info?.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" /> {data.personal_info.linkedin}
              </span>
            )}
            {data.personal_info?.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3" /> {data.personal_info.website}
              </span>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {data.professional_summary && (
              <section className="p-4 border rounded-lg bg-purple-50/30">
                <h2 className="text-lg font-semibold mb-2">Professional Profile</h2>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {data.professional_summary}
                </p>
              </section>
            )}

            {data.experience?.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" style={{ color: accentColor }} />
                  Experience
                </h2>

                <div className="space-y-4">
                  {data.experience.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold">{exp.position}</span>
                        <span className="text-gray-500">
                          {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      {exp.description && (
                        <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.projects?.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5" style={{ color: accentColor }} />
                  Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.projects.map((proj, i) => (
                    <div key={i} className="p-3 border rounded-md">
                      <h3 className="text-sm font-semibold flex gap-2">
                        <ArrowRight className="w-3 h-3" style={{ color: accentColor }} />
                        {proj.name}
                      </h3>
                      <p className="text-xs text-gray-600">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right */}
          <div className="space-y-6">
            {data.education?.length > 0 && (
              <section className="p-4 border rounded-lg">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" style={{ color: accentColor }} />
                  Education
                </h2>

                <div className="space-y-3 text-sm">
                  {data.education.map((edu, i) => (
                    <div key={i}>
                      <p className="font-semibold">{edu.degree}</p>
                      <p className="text-gray-600">{edu.institution}</p>
                      <span className="text-xs text-gray-500">
                        {formatDate(edu.graduation_date)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.skills?.length > 0 && (
              <section className="p-4 border rounded-lg">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" style={{ color: accentColor }} />
                  Skills
                </h2>

                <div className="space-y-2 text-sm">
                  {data.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                      {skill}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElegantTemplate;
