import React from "react";
import Title from "./Title";

const items = [
  {
    tag: "§ 1",
    title: "Live ATS scoring",
    desc: "A running match percentage against the job description, updated as you edit — so you can watch a weak resume become a strong one in real time.",
  },
  {
    tag: "§ 2",
    title: "Track-changes history",
    desc: "Every AI suggestion is logged like a redline. Roll back to an earlier draft, or compare two versions side by side before you export.",
  },
  {
    tag: "§ 3",
    title: "Export, clean",
    desc: "PDF, DOCX, or a shareable link — formatted to survive the ATS parsers that strip out tables, icons, and columns from fancier templates.",
  },
  {
    tag: "§ 4",
    title: "One resume, many roles",
    desc: "Keep a base draft and branch a tailored version per application, without losing track of which line was written for which job.",
  },
];

const Feature = () => {
  return (
    <section
      id="features"
      className="
        scroll-mt-12
        bg-[#FBFAF6]
        text-[#171B24]
        px-6
        md:pl-24
        md:pr-16
      "
    >
      <div className="w-full max-w-5xl py-20">

        <Title
          eyebrow="What's in the margins"
          title="Built like an editor, not a form."
          description="Our streamlined process helps you create a professional resume in minutes with AI-powered tools that edit, not just template."
        />

        <div className="mt-10 border-t border-[#DFDACC]">

          {items.map((item, i) => (
            <div
              key={i}
              className="
                grid
                grid-cols-1
                sm:grid-cols-[70px_1fr]
                gap-2
                sm:gap-7
                py-7
                border-b
                border-[#DFDACC]
                group
              "
            >
              <div className="ff-mono text-[11px] text-[#5B6070] pt-1">
                {item.tag}
              </div>

              <div>
                <h3 className="ff-serif text-xl font-medium group-hover:text-[#2547D0] transition-colors">
                  {item.title}
                </h3>

                <p className="text-[14.5px] text-[#5B6070] leading-relaxed mt-2 max-w-2xl">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Feature;