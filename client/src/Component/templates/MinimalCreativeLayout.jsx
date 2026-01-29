import {
  Mail,
  Phone,
  MapPin,
  Star,
  Target,
  Zap,
  Heart,
  TrendingUp
} from "lucide-react";

const CreativeTemplate = ({ data, accentColor = "#10B981" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-b from-white to-emerald-50 rounded-3xl shadow-xl">

      {/* Decorative Shapes (reduced) */}
      
      <div className="relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3">

          {/* Left Panel */}
          <div
            className="lg:col-span-1 p-8 flex flex-col justify-center"
            style={{ backgroundColor: accentColor }}
          >
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">
                {data.personal_info?.full_name || "Your Name"}
              </h1>
              <p className="text-lg text-emerald-100 mb-6">
                {data.personal_info?.profession || "Professional"}
              </p>

              <div className="space-y-3 text-sm">
                {data.personal_info?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{data.personal_info.email}</span>
                  </div>
                )}
                {data.personal_info?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{data.personal_info.phone}</span>
                  </div>
                )}
                {data.personal_info?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{data.personal_info.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 p-8">

            {/* Summary */}
            {data.professional_summary && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5" style={{ color: accentColor }} />
                  <h2 className="text-xl font-bold text-gray-800">
                    About Me
                  </h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed pl-7 whitespace-pre-wrap">
                  {data.professional_summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="w-5 h-5" style={{ color: accentColor }} />
                  <h2 className="text-xl font-bold text-gray-800">
                    Career Journey
                  </h2>
                </div>

                <div className="relative pl-7">
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-emerald-300"></div>

                  {data.experience.map((exp, index) => (
                    <div key={index} className="mb-6 relative">
                      <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-emerald-500"></div>

                      <div className="ml-2 p-4 rounded-xl bg-white shadow-sm">
                        <div className="flex justify-between text-sm mb-1">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {exp.position}
                            </h3>
                            <p className="text-gray-600">
                              {exp.company}
                            </p>
                          </div>
                          <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
                            {formatDate(exp.start_date)} –{" "}
                            {exp.is_current ? "Present" : formatDate(exp.end_date)}
                          </span>
                        </div>

                        {exp.description && (
                          <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Projects */}
            {data.projects?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5" style={{ color: accentColor }} />
                  <h2 className="text-xl font-bold text-gray-800">
                    Projects
                  </h2>
                </div>

                <div className="space-y-4">
                  {data.projects.map((proj, i) => (
                    <div key={i} className="p-4 rounded-lg bg-emerald-50">
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {proj.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education & Skills */}
            <div className="space-y-6">
              {data.education?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5" style={{ color: accentColor }} />
                    <h2 className="text-xl font-bold text-gray-800">
                      Education
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {data.education.map((edu, i) => (
                      <div key={i} className="p-3 bg-emerald-50 rounded-md text-sm">
                        <p className="font-semibold">{edu.degree}</p>
                        <p className="text-emerald-700">{edu.institution}</p>
                        <span className="text-xs text-gray-500">
                          {formatDate(edu.graduation_date)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.skills?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5" style={{ color: accentColor }} />
                    <h2 className="text-xl font-bold text-gray-800">
                      Skills
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full text-sm bg-emerald-100 text-emerald-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreativeTemplate;
