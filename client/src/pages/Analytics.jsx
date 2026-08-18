import React, { useEffect, useState } from "react";
import api from "../configs/api";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  Eye,
  Globe,
  TrendingUp,
  Clock,
  Activity,
  Target,
  MapPin,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnalyticsSkeleton from "../Component/skeleton/AnalyticsSkeleton";

const COLORS = [
  "#059669",
  "#10b981",
  "#34d399",
  "#6ee7b7",
  "#a7f3d0",
  "#047857",
  "#065f46",
  "#064e3b",
];

const StatCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="bg-white border border-gray-200 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            {label}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-2">
            {value}
          </h2>
        </div>

        <Icon className="w-5 h-5 text-green-700" />
      </div>

      {label === "Last Viewed" && value !== "—" && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
          <Calendar className="w-3 h-3" />
          Updated in real-time
        </div>
      )}
    </div>
  );
};

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const { token, loading: authLoading } = useSelector(
    (state) => state.auth
  );

  const isOnline = useSelector(
    (state) => state.network.isOnline
  );

  // ==========================================
  // FETCH ANALYTICS
  // ==========================================

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/api/analytics/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
    } catch (error) {
      console.error(
        "Analytics error:",
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAnalytics();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ==========================================
  // DERIVED DATA
  // ==========================================

  const totalViews = data?.totalViews || 0;

  const uniqueCountries =
    data?.uniqueCountries || 0;

  const countryData =
    data?.countryDistribution || [];

  const avgViewsPerCountry =
    uniqueCountries > 0
      ? (totalViews / uniqueCountries).toFixed(1)
      : "0";

  const topCountry =
    countryData.length > 0
      ? countryData[0]?.country || "None"
      : "None";

  // ==========================================
  // LOADING
  // ==========================================

  if (
    authLoading ||
    !isOnline ||
    loading
  ) {
    return <AnalyticsSkeleton />;
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (!data) {
    return (
      <div className="min-h-screen bg-[#FBFAF6] flex items-center justify-center px-5">
        <div className="bg-white border border-gray-200 p-8 text-center max-w-md w-full">
          <Activity className="w-8 h-8 mx-auto text-gray-400" />

          <h3 className="text-lg font-semibold text-gray-800 mt-4">
            Analytics Unavailable
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Unable to load analytics data.
            Please try again later.
          </p>

          <button
            onClick={fetchAnalytics}
            className="mt-5 px-4 py-2 bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#FBFAF6]">
      <main className="max-w-6xl mx-auto px-5 md:px-7 py-7">

        {/* ======================================
            BACK BUTTON
        ====================================== */}

        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mt-7 mb-7">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-green-700" />

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Resume Analytics
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Real-time insights of your resume
                performance.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================
            STATS
        ====================================== */}

        <div className="grid grid-cols-2 lg:grid-cols-4 bg-white border border-gray-200 mb-6">

          <StatCard
            icon={Eye}
            label="Total Views"
            value={totalViews}
          />

          <div className="border-l border-gray-200">
            <StatCard
              icon={Globe}
              label="Countries Reached"
              value={uniqueCountries}
            />
          </div>

          <div className="border-l border-gray-200">
            <StatCard
              icon={TrendingUp}
              label="Views / Day"
              value={data.viewsPerDay || 0}
            />
          </div>

          <div className="border-l border-gray-200">
            <StatCard
              icon={Clock}
              label="Last Viewed"
              value={
                data.lastViewed
                  ? new Date(
                      data.lastViewed
                    ).toLocaleDateString()
                  : "—"
              }
            />
          </div>

        </div>

        {/* ======================================
            PERFORMANCE INSIGHTS
        ====================================== */}

        {(totalViews > 0 ||
          uniqueCountries > 0) && (
          <div className="bg-white border border-gray-200 p-5 mb-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div className="flex items-start gap-3">

                <Target className="w-5 h-5 text-green-700 mt-0.5" />

                <div>

                  <h3 className="text-sm font-semibold text-gray-800">
                    Performance Insights
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Your resume has been viewed{" "}
                    <span className="font-medium text-gray-700">
                      {totalViews}
                    </span>{" "}
                    times across{" "}
                    <span className="font-medium text-gray-700">
                      {uniqueCountries}
                    </span>{" "}
                    countries.
                  </p>

                </div>

              </div>

              <div className="flex gap-8 md:gap-10">

                <div>
                  <p className="text-xs text-gray-400">
                    Avg. per Country
                  </p>

                  <p className="text-base font-semibold text-gray-800 mt-1">
                    {avgViewsPerCountry}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Top Country
                  </p>

                  <p className="text-base font-semibold text-gray-800 mt-1">
                    {topCountry}
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ======================================
            CHARTS
        ====================================== */}

        <div className="grid lg:grid-cols-2 gap-5">

          {/* ====================================
              VIEWS OVER TIME
          ==================================== */}

          <div className="bg-white border border-gray-200 p-5">

            <div className="flex items-center gap-3 mb-5">

              <TrendingUp className="w-5 h-5 text-green-700" />

              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Views Over Time
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Daily view count progression
                </p>
              </div>

            </div>

            {data.viewsTimeline?.length ? (
              <div className="h-75">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart
                    data={data.viewsTimeline}
                  >

                    <defs>
                      <linearGradient
                        id="colorViews"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.35}
                        />

                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                    />

                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#6b7280",
                        fontSize: 11,
                      }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#6b7280",
                        fontSize: 11,
                      }}
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border:
                          "1px solid #e5e7eb",
                        borderRadius: "4px",
                        boxShadow:
                          "0 2px 6px rgba(0,0,0,0.08)",
                        fontSize: "12px",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#059669"
                      fill="url(#colorViews)"
                      strokeWidth={2}
                    />

                  </AreaChart>
                </ResponsiveContainer>

              </div>
            ) : (
              <div className="h-75 flex flex-col items-center justify-center text-center">

                <TrendingUp className="w-7 h-7 text-gray-300" />

                <p className="text-sm text-gray-500 mt-3">
                  No timeline data available
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Views over time will appear here.
                </p>

              </div>
            )}

          </div>

          {/* ====================================
              COUNTRY DISTRIBUTION
          ==================================== */}

          <div className="bg-white border border-gray-200 p-5">

            <div className="flex items-center justify-between mb-5">

              <div className="flex items-center gap-3">

                <MapPin className="w-5 h-5 text-green-700" />

                <div>

                  <h3 className="text-sm font-semibold text-gray-800">
                    Geographic Distribution
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Views by country
                  </p>

                </div>

              </div>

              <span className="text-xs text-gray-400">
                {countryData.length} countries
              </span>

            </div>

            {countryData.length ? (
              <div className="h-75">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={countryData}
                      dataKey="count"
                      nameKey="country"
                      outerRadius={95}
                      innerRadius={45}
                      paddingAngle={2}
                      label={(entry) =>
                        `${entry.country}: ${entry.count}`
                      }
                      labelLine={false}
                    >

                      {countryData.map(
                        (_, index) => (
                          <Cell
                            key={index}
                            fill={
                              COLORS[
                                index %
                                  COLORS.length
                              ]
                            }
                            stroke="#ffffff"
                            strokeWidth={2}
                          />
                        )
                      )}

                    </Pie>

                    <Tooltip
                      contentStyle={{
                        backgroundColor:
                          "#ffffff",
                        border:
                          "1px solid #e5e7eb",
                        borderRadius: "4px",
                        boxShadow:
                          "0 2px 6px rgba(0,0,0,0.08)",
                        fontSize: "12px",
                      }}
                    />

                  </PieChart>

                </ResponsiveContainer>

              </div>
            ) : (
              <div className="h-75 flex flex-col items-center justify-center text-center">

                <Globe className="w-7 h-7 text-gray-300" />

                <p className="text-sm text-gray-500 mt-3">
                  No country data available
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Geographic distribution will
                  appear here.
                </p>

              </div>
            )}

          </div>

        </div>

      </main>
    </div>
  );
};

export default Analytics;