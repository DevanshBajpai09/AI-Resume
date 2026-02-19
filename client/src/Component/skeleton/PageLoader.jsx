import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PageLoader = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <Skeleton height={32} width={200} />
      <Skeleton height={20} width={300} />

      {[1, 2, 3].map((i) => (
        <Skeleton key={i} height={80} />
      ))}
    </div>
  );
};

export default PageLoader;
