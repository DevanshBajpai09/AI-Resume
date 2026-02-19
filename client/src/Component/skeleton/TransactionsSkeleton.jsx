import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TransactionsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-10">
        <Skeleton height={40} width={260} />
        <div className="mt-2">
          <Skeleton height={16} width={320} />
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-gray-400 rounded-2xl p-6">
            <Skeleton height={14} width={120} />
            <div className="mt-3">
              <Skeleton height={28} width={140} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="border border-gray-400 rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Skeleton height={36} width={260} />
          <Skeleton height={40} width={200} />
        </div>
      </div>

      {/* Transaction rows */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-gray-400 rounded-2xl p-6">
            <div className="flex justify-between items-center gap-4">
              
              {/* Left */}
              <div className="flex-1">
                <Skeleton height={16} width={220} />
                <div className="mt-2">
                  <Skeleton height={12} width={180} />
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <Skeleton height={20} width={80} />
                <Skeleton height={36} width={90} borderRadius={8} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsSkeleton;
