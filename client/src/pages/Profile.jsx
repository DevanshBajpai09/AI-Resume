import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Mail,
  Calendar,
  LogOut,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/Features/authSlice";
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

  const createdDate = user.createdAt
    ? new Date(user.createdAt)
    : null;

  const premiumDate = user.premiumActivatedAt
    ? new Date(user.premiumActivatedAt)
    : null;

  const expiryDate = user.premiumExpiresAt
    ? new Date(user.premiumExpiresAt)
    : null;

  return (
    <div className="min-h-screen bg-[#FBFAF6] text-[#171B24]">

      {/* ================= TOP ================= */}

      <div className="max-w-6xl mx-auto px-6 pt-7">

        <Link
          to="/app"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-[#5B6070]
            hover:text-[#171B24]
            transition-colors
          "
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>

      </div>

      {/* ================= MAIN ================= */}

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Heading */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div
              className="
                w-10
                h-10
                -lg
                bg-[#F0F3EE]
               border 
                border-[#D8E0D6]
                flex
                items-center
                justify-center
              "
            >
              <User className="size-5 text-[#3F7D5A]" />
            </div>

            <div>

              <h1 className="text-2xl font-semibold text-[#171B24]">
                My Profile
              </h1>

              <p className="text-sm text-[#5B6070] mt-1">
                Manage your account and subscription
              </p>

            </div>

          </div>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ================= LEFT ================= */}

          <div className="lg:col-span-2">

            <div
              className="
                bg-white
                border
                border-[#DFDACC]
                
                overflow-hidden
              "
            >

              {/* Profile */}

              <div className="p-6">

                <div className="flex items-center gap-5">

                  {/* Avatar */}

                  <div
                    className="
                      w-20
                      h-20
                      
                      bg-[#F0F3EE]
                      border
                      border-[#D8E0D6]
                      flex
                      items-center
                      justify-center
                      text-2xl
                      font-semibold
                      text-[#3F7D5A]
                    "
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* User */}

                  <div className="flex-1 min-w-0">

                    <h2 className="text-xl font-semibold text-[#171B24]">
                      {user.name}
                    </h2>

                    <p className="text-sm text-[#5B6070] mt-1">
                      {user.email}
                    </p>

                    <div className="mt-3">

                      {user.isPremium ? (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-3
                            py-1
                            -lg
                            bg-[#F0F3EE]
                            border
                            border-[#D8E0D6]
                            text-[#3F7D5A]
                            text-xs
                            font-medium
                          "
                        >
                          <Sparkles className="size-3.5" />
                          Premium
                        </span>
                      ) : (
                        <span
                          className="
                            inline-flex
                            items-center
                            px-3
                            py-1
                            -lg
                            bg-[#F7F6F1]
                            border
                            border-[#DFDACC]
                            text-[#5B6070]
                            text-xs
                            font-medium
                          "
                        >
                          Free Account
                        </span>
                      )}

                    </div>

                  </div>

                </div>

              </div>

              {/* Divider */}

              <div className="border-t border-[#DFDACC]" />

              {/* Account Information */}

              <div className="p-6">

                <h3 className="text-base font-semibold text-[#171B24]">
                  Account Information
                </h3>

                <p className="text-sm text-[#5B6070] mt-1">
                  Your account details
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-5">

                  {/* Email */}

                  <div
                    className="
                      border
                      border-[#DFDACC]
                      -lg
                      p-4
                      bg-[#FBFAF6]
                    "
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-9
                          h-9
                          -lg
                          bg-white
                          border
                          border-[#DFDACC]
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Mail className="size-4 text-[#5B6070]" />
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs text-[#5B6070]">
                          Email
                        </p>

                        <p className="text-sm text-[#171B24] mt-1 break-all">
                          {user.email}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Joined */}

                  <div
                    className="
                      border
                      border-[#DFDACC]
                      -lg
                      p-4
                      bg-[#FBFAF6]
                    "
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-9
                          h-9
                          -lg
                          bg-white
                          border
                          border-[#DFDACC]
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Calendar className="size-4 text-[#5B6070]" />
                      </div>

                      <div>

                        <p className="text-xs text-[#5B6070]">
                          Joined
                        </p>

                        <p className="text-sm text-[#171B24] mt-1">
                          {createdDate
                            ? createdDate.toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* ================= PREMIUM ================= */}

              {user.isPremium && (
                <>
                  <div className="border-t border-[#DFDACC]" />

                  <div className="p-6">

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="text-base font-semibold text-[#171B24]">
                          Premium
                        </h3>

                        <p className="text-sm text-[#5B6070] mt-1">
                          Your premium subscription
                        </p>

                      </div>

                      <CheckCircle className="size-5 text-[#3F7D5A]" />

                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mt-5">

                      <div
                        className="
                          border
                          border-[#DFDACC]
                          -lg
                          p-4
                          bg-[#FBFAF6]
                        "
                      >

                        <p className="text-xs text-[#5B6070]">
                          Activated
                        </p>

                        <p className="text-sm text-[#171B24] mt-1">
                          {premiumDate
                            ? premiumDate.toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </p>

                      </div>

                      <div
                        className="
                          border
                          border-[#DFDACC]
                          -lg
                          p-4
                          bg-[#FBFAF6]
                        "
                      >

                        <p className="text-xs text-[#5B6070]">
                          Expires
                        </p>

                        <p className="text-sm text-[#171B24] mt-1">
                          {expiryDate
                            ? expiryDate.toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </p>

                      </div>

                    </div>

                  </div>
                </>
              )}

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="space-y-6">

            {/* Account Status */}

            <div
              className="
                bg-white
                border
                border-[#DFDACC]
                -xl
                p-5
              "
            >

              <h3 className="text-base font-semibold text-[#171B24]">
                Account Status
              </h3>

              <div className="mt-5 space-y-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-[#5B6070]">
                    Status
                  </span>

                  <span className="flex items-center gap-2 text-sm text-[#3F7D5A] font-medium">

                    <span className="w-2 h-2 -full bg-[#3F7D5A]" />

                    Active

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm text-[#5B6070]">
                    Account
                  </span>

                  <span className="text-sm font-medium text-[#171B24]">
                    {user.isPremium
                      ? "Premium"
                      : "Free"}
                  </span>

                </div>

                <div className="pt-4 border-t border-[#DFDACC]">

                  <p className="text-xs text-[#5B6070]">
                    Account ID
                  </p>

                  <p className="text-xs font-mono text-[#171B24] mt-1">
                    {user._id
                      ? user._id.slice(-10)
                      : "—"}
                  </p>

                </div>

              </div>

            </div>

            {/* Logout */}

            <div
              className="
                bg-white
                border
                border-[#DFDACC]
                -xl
                p-5
              "
            >

              <div className="flex items-center gap-3 mb-4">

                <div
                  className="
                    w-9
                    h-9
                    -lg
                    bg-[#F7F6F1]
                    border
                    border-[#DFDACC]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <LogOut className="size-4 text-[#5B6070]" />
                </div>

                <div>

                  <h3 className="text-sm font-semibold text-[#171B24]">
                    Sign Out
                  </h3>

                  <p className="text-xs text-[#5B6070] mt-1">
                    Sign out from your account
                  </p>

                </div>

              </div>

              <button
                onClick={handleLogout}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2.5
                  -lg
                  border
                  border-[#DFDACC]
                  bg-[#FBFAF6]
                  text-[#5B6070]
                  text-sm
                  font-medium
                  hover:bg-white
                  hover:text-[#171B24]
                  transition-colors
                "
              >
                <LogOut className="size-4" />
                Logout
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Profile;