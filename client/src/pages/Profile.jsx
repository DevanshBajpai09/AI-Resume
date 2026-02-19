import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Calendar,
  LogOut,
  ArrowLeft,
  Crown,
  CheckCircle,
  User as UserIcon,
} from "lucide-react";
import { logout } from "../app/Features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import ProfileSkeleton from "../Component/skeleton/ProfileSkeleton";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const isOnline = useSelector((state) => state.network.isOnline);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

 if (loading || !isOnline) {
  return <ProfileSkeleton />;
}

if (!user) return null;


  // ✅ clean member duration calculation
  const days = Math.floor(
  // eslint-disable-next-line react-hooks/purity
  (Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)
);

const memberDurationText =
  days === 0 ? "Today" : `${days} day${days > 1 ? "s" : ""}`;

  return (
    <>
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-600 hover:text-green-700 transition-all group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-linear-to-br from-green-50 to-emerald-50 border border-green-100">
              <UserIcon className="w-6 h-6 text-green-700" />
            </div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              My Profile
            </h1>
          </div>
          <p className="text-slate-600">
            Manage your account and subscription details
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="md:col-span-2 space-y-8">
            {/* Profile Card */}
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl shadow-lg border border-green-50 overflow-hidden"
            >
              {/* Premium Banner */}
              {user.isPremium && (
                <div className="bg-linear-to-r from-emerald-500 via-green-500 to-emerald-600 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Crown className="w-5 h-5 text-yellow-300" />
                      <span className="text-white font-semibold text-sm">
                        Premium Member
                      </span>
                    </div>
                    <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Avatar + Name */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-green-100 to-emerald-100 flex items-center justify-center text-3xl font-bold text-green-800 border-4 border-white shadow-lg">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>

                    {user.isPremium && (
                      <div className="absolute -bottom-2 -right-2 bg-linear-to-r from-emerald-500 to-green-500 text-white p-2 rounded-full shadow-lg">
                        <Crown className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {user.name}
                    </h2>

                    {/* ✅ email overflow FIX */}
                    <p className="text-slate-600 mb-4 break-all">{user.email}</p>

                    {user.isPremium ? (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-green-50 to-emerald-50 border border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">
                          Premium Active
                        </span>
                      </div>
                    ) : (
                      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold hover:shadow-lg transition-shadow">
                        <Sparkles className="w-4 h-4" />
                        Upgrade to Premium
                      </button>
                    )}
                  </div>
                </div>

                {/* INFO CARDS */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {/* Email */}
                  <div className="bg-linear-to-br from-green-50/50 to-white p-4 rounded-xl border border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-green-100">
                        <Mail className="w-4 h-4 text-green-700" />
                      </div>
                      <div className="w-full">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase">
                          Email
                        </h3>
                        <p className="text-slate-800 break-all">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="bg-linear-to-br from-emerald-50/50 to-white p-4 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-emerald-100">
                        <Calendar className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase">
                          Member Since
                        </h3>
                        <p className="text-slate-800">
                          {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Premium Section */}
                  {user.isPremium && user.premiumActivatedAt && (
                    <div className="md:col-span-2 bg-linear-to-r from-emerald-50/70 to-green-50/70 p-4 rounded-xl border border-emerald-200">
                      {/* Activated */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-linear-to-r from-emerald-500 to-green-500">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-slate-500 uppercase">
                            Premium Activated
                          </h3>
                          <p className="text-slate-800">
                            {new Date(user.premiumActivatedAt).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "long", day: "numeric" }
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Expiry */}
                      {user.premiumExpiresAt && (
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-yellow-100">
                            <Calendar className="w-4 h-4 text-yellow-700" />
                          </div>
                          <div>
                            <h3 className="text-xs font-semibold text-slate-500 uppercase">
                              Premium Expires
                            </h3>
                            <p className="text-slate-800">
                              {new Date(user.premiumExpiresAt).toLocaleDateString(
                                "en-US",
                                { year: "numeric", month: "long", day: "numeric" }
                              )}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-3 text-sm text-emerald-700 bg-emerald-100/50 p-3 rounded-lg">
                        <span className="font-medium">✨ Premium Benefits:</span>{" "}
                        All features unlocked • Priority support • No ads
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* Account Status */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-50 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Account Status
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Account Type</span>
                  <span
                    className={`font-semibold ${
                      user.isPremium ? "text-emerald-600" : "text-slate-700"
                    }`}
                  >
                    {user.isPremium ? "Premium Plan" : "Free Plan"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Status</span>
                  <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Member Duration</span>
                  <span className="font-semibold text-slate-800">
                    {memberDurationText}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
                Account ID:{" "}
                <span className="font-mono text-slate-700">
                  {user._id?.slice(-8)}
                </span>
              </div>
            </div>

            {/* Logout */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-white to-red-50 rounded-2xl shadow-lg border border-red-100 p-6"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Secure Logout
                </h3>
                <p className="text-sm text-slate-600">Sign out from all devices</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl
                bg-linear-to-r from-red-50 to-red-50/50 text-red-600 border-2 border-red-200
                hover:from-red-100 hover:to-red-50 hover:border-red-300 hover:shadow-lg
                active:scale-[0.98] transition-all duration-200 font-semibold"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>

              <p className="text-xs text-slate-500 text-center mt-4">
                You'll be redirected to the home page
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
