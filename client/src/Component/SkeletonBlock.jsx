import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonBlock = ({ height = 20, width = "100%", count = 1 }) => {
  return <Skeleton height={height} width={width} count={count} />;
};

export default SkeletonBlock;
