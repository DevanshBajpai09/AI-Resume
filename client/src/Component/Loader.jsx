import React from "react";

const Loader = ({ text = "Loading your resume..." }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FBFAF6]">

      <div className="flex flex-col items-center">

        {/* Logo */}
        <div className="mb-8">
          <span className="text-4xl font-semibold tracking-tight text-[#171B24]">
            resume
          </span>
          <span className="inline-block w-2.5 h-2.5 ml-1 rounded-full bg-green-500" />
        </div>

        {/* Loader */}
        <div className="relative w-12 h-12">

          {/* Outer ring */}
          <div
            className="
              absolute inset-0
              rounded-full
              border-[3px]
              border-[#DFDACC]
              border-t-green-600
              animate-spin
            "
          />

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse" />
          </div>

        </div>

        {/* Loading text */}
        <p className="mt-6 text-sm font-medium tracking-wide text-[#171B24]">
          {text}
        </p>

        {/* Subtitle */}
        <p className="mt-1 text-xs text-[#5B6070]">
          Please wait a moment
        </p>

        {/* Small progress dots */}
        <div className="flex items-center gap-1.5 mt-5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse [animation-delay:300ms]" />
        </div>

      </div>

    </div>
  );
};

export default Loader;