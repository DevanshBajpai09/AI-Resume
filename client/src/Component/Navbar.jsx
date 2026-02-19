import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/Features/authSlice";
import { Sparkles, ChevronDown } from "lucide-react";
import NavbarSkeleton from "./skeleton/NavbarSkeleton";

const Navbar = () => {
  const { user, loading } = useSelector((state) => state.auth);
 
const isOnline = useSelector((state) => state.network.isOnline);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const logoutAction = () => {
    dispatch(logout());
    navigate("/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading || !isOnline) {
  return <NavbarSkeleton />;
}


  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800">

        {/* Logo */}
        <Link to="/app">
          <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
        </Link>

        {/* Right Side */}
        {user && (
          <div className="flex items-center gap-4 text-sm relative" ref={dropdownRef}>

            {/* Premium Badge */}
            {user.isPremium && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold
                bg-green-100 text-green-700 border border-green-300">
                <Sparkles className="w-4 h-4" />
                PREMIUM
              </span>
            )}

            {/* Profile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 font-medium hover:text-black transition"
            >
              Hi, {user.name}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 top-12 z-50 w-44 bg-white/95 backdrop-blur
border border-gray-200 rounded-xl shadow-xl py-2
origin-top-right transform transition-all duration-200
${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
            >
              <Link
                to="/app/profile"
                className="block px-4 py-2 hover:bg-gray-50 transition"
                onClick={() => setOpen(false)}
              >
                My Profile
              </Link>

              <Link
                to="/app/transactions"
                className="block px-4 py-2 hover:bg-gray-50 transition"
                onClick={() => setOpen(false)}
              >
                Transactions
              </Link>
              <Link
                to="/app/analytics"
                className="block px-4 py-2 hover:bg-gray-50 transition"
                onClick={() => setOpen(false)}
              >
                Analytics
              </Link>
              <a href="https://ai-interview-area.vercel.app/" target="_blank" className="block px-4 py-2 hover:bg-gray-50 transition"
                onClick={() => setOpen(false)}>
              Interview
              </a>

              <button
                onClick={logoutAction}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
