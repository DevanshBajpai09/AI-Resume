import React from "react";

const Loader = ({ text = "Loading your resume..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">

      {/* Glow background */}
      <div className="absolute w-72 h-72 bg-green-200/40 rounded-full blur-3xl animate-pulse" />

      {/* Spinner */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-green-200 border-t-green-600 animate-spin" />

        {/* Inner circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-6 text-green-700 font-semibold tracking-wide animate-pulse">
        {text}
      </p>

      {/* Small subtitle */}
      <p className="text-sm text-gray-400 mt-1">
        Please wait a moment
      </p>
    </div>
  );
};

export default Loader;
