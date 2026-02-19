import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Welcome text (mobile) */}
      <Skeleton height={28} width={180} />

      {/* Create / Upload buttons */}
      <div className="flex gap-4 mt-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="w-full sm:max-w-36 h-48 flex items-center justify-center border border-gray-400 border-dashed rounded-lg"
          >
            <Skeleton height={80} width={80} borderRadius={12} />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-6">
        <Skeleton height={1} />
      </div>

      {/* Resume cards grid */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="w-full sm:max-w-36 h-48 border border-gray-400 border-dashed rounded-lg flex flex-col items-center justify-center gap-2"
          >
            <Skeleton height={24} width={24} />
            <Skeleton height={14} width={80} />
            <Skeleton height={10} width={70} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
