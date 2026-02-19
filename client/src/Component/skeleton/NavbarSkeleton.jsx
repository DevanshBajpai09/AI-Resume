import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NavbarSkeleton = () => {
  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5">

        {/* Logo */}
        <Skeleton height={44} width={120} />

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Premium badge */}
          <Skeleton height={24} width={80} borderRadius={999} />

          {/* Username */}
          <Skeleton height={18} width={100} />
        </div>
      </nav>
    </div>
  );
};

export default NavbarSkeleton;
