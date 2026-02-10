import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ---------------- SORTABLE WRAPPER ---------------- */
const SortableSection = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

/* ---------------- TEMPLATE ---------------- */
const MinimalTemplate = ({ data, accentColor, onReorder }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  /* -------- SECTION ORDER -------- */
  const sectionOrder = data.sectionOrder || [
    "summary",
    "experience",
    "projects",
    "education",
    "skills",
  ];

  /* -------- DRAG END -------- */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sectionOrder.indexOf(active.id);
    const newIndex = sectionOrder.indexOf(over.id);

    const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);

    onReorder && onReorder(newOrder);
  };

  /* -------- RENDER EACH SECTION -------- */
  const renderSection = (section) => {
    switch (section) {
      case "summary":
        return (
          data.professional_summary && (
            <section className="mb-10">
              <p className="text-gray-700 whitespace-pre-wrap">
                {data.professional_summary}
              </p>
            </section>
          )
        );

      case "experience":
        return (
          data.experience?.length > 0 && (
            <section className="mb-10">
              <h2
                className="text-sm uppercase tracking-widest mb-6 font-medium"
                style={{ color: accentColor }}
              >
                Experience
              </h2>

              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <h3 className="text-lg font-medium">{exp.position}</h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(exp.start_date)} –{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{exp.company}</p>
                    {exp.description && (
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        );

      case "projects":
        return (
          data.projects?.length > 0 && (
            <section className="mb-10">
              <h2
                className="text-sm uppercase tracking-widest mb-6 font-medium"
                style={{ color: accentColor }}
              >
                Projects
              </h2>

              <div className="space-y-4">
                {data.projects.map((p, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-medium">{p.name}</h3>
                    <p className="text-gray-600">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )
        );

      case "education":
        return (
          data.education?.length > 0 && (
            <section className="mb-10">
              <h2
                className="text-sm uppercase tracking-widest mb-6 font-medium"
                style={{ color: accentColor }}
              >
                Education
              </h2>

              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i} className="flex justify-between">
                    <div>
                      <h3 className="font-medium">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(edu.graduation_date)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )
        );

      case "skills":
        return (
          data.skills?.length > 0 && (
            <section>
              <h2
                className="text-sm uppercase tracking-widest mb-6 font-medium"
                style={{ color: accentColor }}
              >
                Skills
              </h2>

              <div className="text-gray-700">{data.skills.join(" • ")}</div>
            </section>
          )
        );

      default:
        return null;
    }
  };

  /* ---------------- JSX ---------------- */
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
      {/* HEADER (not draggable) */}
      <header className="mb-10">
        <h1 className="text-4xl font-thin mb-4 tracking-wide">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && (
            <span>{data.personal_info.location}</span>
          )}
          {data.personal_info?.linkedin && (
            <span className="break-all">{data.personal_info.linkedin}</span>
          )}
          {data.personal_info?.website && (
            <span className="break-all">{data.personal_info.website}</span>
          )}
        </div>
      </header>

      {/* DRAGGABLE SECTIONS */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          {sectionOrder.map((section) => (
            <SortableSection key={section} id={section}>
              {renderSection(section)}
            </SortableSection>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default MinimalTemplate;
