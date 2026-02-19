import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TestimonialSkeleton = () => {
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

      {/* Testimonial Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="p-6 rounded-2xl border border-gray-200 shadow-sm"
          >
            {/* Avatar + Name */}
            <div className="flex items-center gap-3">
              <Skeleton circle height={48} width={48} />
              <div>
                <Skeleton height={14} width={120} />
                <div className="mt-1">
                  <Skeleton height={12} width={80} />
                </div>
              </div>
            </div>

            {/* Review text */}
            <div className="mt-4 space-y-2">
              <Skeleton height={12} />
              <Skeleton height={12} />
              <Skeleton height={12} width="80%" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSkeleton;
