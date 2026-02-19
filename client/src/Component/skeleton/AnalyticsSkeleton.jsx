import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AnalyticsSkeleton = () => {
  return (
    <div className="min-h-screen p-7 md:p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <Skeleton height={36} width={260} />
          <div className="mt-2">
            <Skeleton height={16} width={320} />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-400 shadow">
              <Skeleton height={14} width={100} />
              <div className="mt-3">
                <Skeleton height={28} width={120} />
              </div>
            </div>
          ))}
        </div>

        {/* Insight bar */}
        <div className="border border-gray-400 rounded-2xl p-6">
          <Skeleton height={18} width={200} />
          <div className="mt-2">
            <Skeleton height={14} width={280} />
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-400 shadow">
              <Skeleton height={18} width={180} />
              <div className="mt-4">
                <Skeleton height={260} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSkeleton;
