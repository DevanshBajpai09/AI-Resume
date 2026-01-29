import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/Features/authSlice";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutAction = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800">
        <Link to="/">
          <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {user && (
            <>
              <p className="max-sm:hidden">
                Hi, <span className="font-medium">{user.name}</span>
              </p>

              {user.isPremium && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold
                  bg-green-100 text-green-700 border border-green-300">
                  <Sparkles className="w-4 h-4" />
                  PREMIUM
                </span>
              )}

              <button
                onClick={logoutAction}
                className="bg-white cursor-pointer hover:bg-slate-50 border border-gray-300
                px-7 py-1.5 rounded-full active:scale-95 transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
