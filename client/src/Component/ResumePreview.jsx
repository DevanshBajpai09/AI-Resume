import React from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import ModernTemplate from "../Component/templates/ModernTemplate";
import ClassicTemplate from "../Component/templates/ClassicTemplate";
import MinimalTemplate from "../Component/templates/MinimalTemplate";
import MinimalImageTemplate from "../Component/templates/MinimalImageTemplate";
import FuturisticTemplate from "../Component/templates/FuturisticLayout";
import CreativeTemplate from "../Component/templates/MinimalCreativeLayout";
import ElegantTemplate from "../Component/templates/ElegantProfessionalLayout";


/* ---------- Sortable Wrapper ---------- */
const SortableSection = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag handle visible on hover */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-6 top-2 opacity-0 group-hover:opacity-100 
                   cursor-grab text-gray-400 text-xs select-none"
      >
        ⠿
      </div>

      {children}
    </div>
  );
};


/* ---------- Resume Preview ---------- */
const ResumePreview = ({ data, template, accentColor, classes = "", onReorder }) => {

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = data.sectionOrder.indexOf(active.id);
    const newIndex = data.sectionOrder.indexOf(over.id);

    const newOrder = arrayMove(data.sectionOrder, oldIndex, newIndex);

    onReorder?.(newOrder); // call parent to save in DB
  };

  const renderTemplate = () => {
    const props = { data, accentColor, SortableSection };

    switch (template) {
      case "modern":
        return <ModernTemplate {...props} />;
      case "minimal":
        return <MinimalTemplate {...props} />;
      case "minimal-image":
        return <MinimalImageTemplate {...props} />;
      case "futuristic":
        return <FuturisticTemplate {...props} />;
      case "creative":
        return <CreativeTemplate {...props} />;
      case "elegant":
        return <ElegantTemplate {...props} />;
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={"border border-gray-200 print-shadow-none print-border-none " + classes}
      >
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={data.sectionOrder || []}
            strategy={verticalListSortingStrategy}
          >
            {renderTemplate()}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default ResumePreview;
