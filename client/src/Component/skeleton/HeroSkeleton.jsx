import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      
      {/* Title */}
      <Skeleton height={60} width={500} />
      <div className="mt-3">
        <Skeleton height={60} width={420} />
      </div>

      {/* Subtitle */}
      <div className="mt-6">
        <Skeleton height={20} width={300} />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <Skeleton height={48} width={160} borderRadius={999} />
        <Skeleton height={48} width={160} borderRadius={999} />
      </div>

      {/* Image */}
      <div className="mt-16 w-full max-w-5xl">
        <Skeleton height={350} borderRadius={20} />
      </div>
    </div>
  );
};

export default HeroSkeleton;
