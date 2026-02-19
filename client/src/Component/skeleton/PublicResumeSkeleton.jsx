import React from "react";

const Line = ({ w = "w-full" }) => (
  <div className={`h-3 bg-gray-200 rounded ${w} animate-pulse`} />
);

const Block = ({ h = "h-20" }) => (
  <div className={`${h} bg-gray-200 rounded-xl animate-pulse`} />
);

const PublicResumeSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
          <div className="flex-1 space-y-2">
            <Line w="w-1/2" />
            <Line w="w-1/3" />
          </div>
        </div>

        {/* Sections */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-3">
            <Line w="w-1/4" />
            <Block />
            <Block h="h-14" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicResumeSkeleton;
