import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FooterSkeleton = () => {
  return (
    <footer className="mt-40 px-6 md:px-16 lg:px-24 xl:px-32 py-16">
      
      <div className="flex flex-wrap justify-between gap-10">

        {/* Left logo + columns */}
        <div className="flex flex-wrap gap-10 md:gap-16">
          
          {/* Logo */}
          <Skeleton height={40} width={120} />

          {/* Columns */}
          {[1, 2, 3].map((col) => (
            <div key={col} className="space-y-3">
              <Skeleton height={16} width={80} />
              <Skeleton height={12} width={70} />
              <Skeleton height={12} width={60} />
              <Skeleton height={12} width={65} />
            </div>
          ))}
        </div>

        {/* Right text + icons */}
        <div className="flex flex-col gap-4 items-end">
          <Skeleton height={14} width={180} />
          
          {/* Social icons */}
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} circle height={24} width={24} />
            ))}
          </div>

          <Skeleton height={12} width={140} />
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeleton;
