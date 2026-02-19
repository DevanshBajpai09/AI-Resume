import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ResumeBuilderSkeleton = () => {
  return (
    <div>
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Skeleton height={18} width={160} />
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT PANEL */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg  shadow-sm p-6 space-y-6">

              {/* Template + color picker */}
              <div className="flex gap-3">
                <Skeleton height={36} width={120} />
                <Skeleton height={36} width={100} />
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between">
                <Skeleton height={36} width={90} />
                <Skeleton height={36} width={70} />
              </div>

              {/* Form fields */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton height={14} width={120} />
                  <Skeleton height={40} />
                </div>
              ))}

              {/* Save button */}
              <Skeleton height={36} width={140} />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-7">
            {/* Action buttons */}
            <div className="flex justify-end gap-2 mb-3">
              <Skeleton height={32} width={80} />
              <Skeleton height={32} width={80} />
              <Skeleton height={32} width={100} />
            </div>

            {/* Resume preview paper */}
            <div className="bg-white  rounded-lg shadow p-6">
              <Skeleton height={24} width={200} />
              <div className="mt-4 space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} height={14} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderSkeleton;
