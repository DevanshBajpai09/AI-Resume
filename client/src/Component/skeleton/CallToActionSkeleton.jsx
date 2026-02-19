import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CallToActionSkeleton = () => {
  return (
    <div className="mt-28 w-full max-w-5xl mx-auto px-10 sm:px-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-3 md:px-10 py-16 sm:py-20 w-full border border-slate-200 rounded-lg">
        
        {/* Text */}
        <Skeleton height={24} width={260} />

        {/* Button */}
        <Skeleton height={44} width={140} borderRadius={6} />
      </div>
    </div>
  );
};

export default CallToActionSkeleton;
