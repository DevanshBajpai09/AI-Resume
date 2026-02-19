import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AuthSkeleton = ({ showNameField = false }) => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 py-6 w-full">
        <Skeleton height={18} width={80} />
      </div>

      {/* Center form */}
      <div className="flex items-center justify-center flex-1 bg-gray-50">
        <div className="sm:w-[350px] w-full border border-gray-200 rounded-2xl px-8 py-10 bg-white">

          {/* Title */}
          <Skeleton height={32} width={120} />
          <div className="mt-2">
            <Skeleton height={14} width={160} />
          </div>

          {/* Name field (register only) */}
          {showNameField && (
            <div className="mt-6">
              <Skeleton height={48} borderRadius={999} />
            </div>
          )}

          {/* Email */}
          <div className="mt-4">
            <Skeleton height={48} borderRadius={999} />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Skeleton height={48} borderRadius={999} />
          </div>

          {/* Forgot password / hints */}
          <div className="mt-3">
            <Skeleton height={12} width={120} />
          </div>

          {/* Button */}
          <div className="mt-5">
            <Skeleton height={44} borderRadius={999} />
          </div>

          {/* Switch text */}
          <div className="mt-4 flex justify-center">
            <Skeleton height={12} width={180} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSkeleton;
