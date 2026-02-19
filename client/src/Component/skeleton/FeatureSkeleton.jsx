import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeatureSkeleton = () => {
  return (
    <div className="flex flex-col items-center my-8 px-4">
      
      {/* Badge */}
      <Skeleton height={28} width={140} borderRadius={999} />

      {/* Title */}
      <div className="mt-4 text-center">
        <Skeleton height={36} width={320} />
        <div className="mt-2">
          <Skeleton height={16} width={420} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-center xl:mt-10 gap-8 w-full max-w-6xl mt-8">

        {/* Left Image */}
        <Skeleton height={320} width={420} borderRadius={16} />

        {/* Right Feature Cards */}
        <div className="space-y-6 w-full max-w-md">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center gap-6 rounded-xl py-4 pr-4"
            >
              <Skeleton height={60} width={60} borderRadius={12} />
              <div className="flex-1">
                <Skeleton height={18} width={180} />
                <div className="mt-2">
                  <Skeleton height={14} width="90%" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSkeleton;
