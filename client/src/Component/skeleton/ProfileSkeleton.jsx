import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-10">
        <Skeleton height={40} width={220} />
        <div className="mt-2">
          <Skeleton height={16} width={260} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT COLUMN */}
        <div className="md:col-span-2 space-y-8">

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow border p-8">

            {/* Avatar + name */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <Skeleton circle height={96} width={96} />
              <div className="flex-1">
                <Skeleton height={24} width={180} />
                <div className="mt-2">
                  <Skeleton height={14} width={220} />
                </div>
                <div className="mt-4">
                  <Skeleton height={32} width={140} borderRadius={999} />
                </div>
              </div>
            </div>

            {/* Info cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="border rounded-xl p-4">
                  <Skeleton height={14} width={120} />
                  <div className="mt-2">
                    <Skeleton height={16} width={180} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">

          {/* Account status */}
          <div className="bg-white rounded-2xl shadow border p-6 space-y-4">
            <Skeleton height={20} width={140} />
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} height={14} />
            ))}
            <Skeleton height={12} width={120} />
          </div>

          {/* Logout card */}
          <div className="bg-white rounded-2xl shadow border p-6 text-center">
            <Skeleton circle height={48} width={48} />
            <div className="mt-4">
              <Skeleton height={16} width={120} />
            </div>
            <div className="mt-2">
              <Skeleton height={12} width={160} />
            </div>
            <div className="mt-6">
              <Skeleton height={44} borderRadius={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
