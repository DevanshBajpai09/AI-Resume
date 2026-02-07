import React, { useEffect, useState } from "react";
import api from "../configs/api";
import {
  LineChart,
  Line,
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
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Eye, Globe, TrendingUp, Clock, Activity, Target, Users, MapPin, Calendar } from "lucide-react";

const COLORS = [
  "#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0",
  "#047857", "#065f46", "#064e3b", "#022c22"
];

const StatCard = ({ icon: Icon, label, value, trend, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="group relative bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
  >
    <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-100/50 to-emerald-100/30 rounded-full blur-xl group-hover:scale-110 transition-transform" />
    
    <div className="relative z-10 flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-emerald-50 group-hover:from-green-200 group-hover:to-emerald-100 transition-all">
          <Icon className="w-6 h-6 text-green-700" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <h2 className="text-3xl font-bold text-green-900">{value}</h2>
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-50">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-green-700">{trend}</span>
        </div>
      )}
    </div>
    
    {label === "Last Viewed" && value !== "—" && (
      <div className="relative z-10 mt-4 pt-4 border-t border-green-50">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>Updated in real-time</span>
        </div>
      </div>
    )}
  </motion.div>
);

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [timeRange, setTimeRange] = useState("7d");

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/api/analytics/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    } catch (err) {
      console.error("Analytics error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAnalytics();
  }, [token]);

  // Calculate derived metrics from real data
  const getDerivedMetrics = () => {
    if (!data) return {};
    
    const totalViews = data.totalViews || 0;
    const uniqueCountries = data.uniqueCountries || 0;
    const countryData = data.countryDistribution || [];
    
    // Calculate average views per country (avoid division by zero)
    const avgViewsPerCountry = uniqueCountries > 0 
      ? (totalViews / uniqueCountries).toFixed(1)
      : "0";
    
    // Find top country
    const topCountry = countryData.length > 0 
      ? countryData[0]?.country || "None"
      : "None";
    
    return { avgViewsPerCountry, topCountry };
  };

  const derived = getDerivedMetrics();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50/40 via-white to-emerald-50/30">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-200 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className="w-8 h-8 text-green-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-green-700 font-semibold">Loading analytics dashboard</p>
          <p className="text-sm text-gray-500 mt-2">Fetching real-time insights...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50/40 to-white">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-100 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Analytics Unavailable</h3>
          <p className="text-gray-600 mb-6">Unable to load analytics data. Please try again later.</p>
          <button
            onClick={fetchAnalytics}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-7 md:p-6">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-900 to-emerald-800 bg-clip-text text-transparent">
                Resume Analytics
              </h1>
            </div>
            <p className="text-gray-600">
              Real-time insights of your resume performance
            </p>
          </div>
          
          {/* Time Range Selector */}
          
        </motion.div>

        {/* STATS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard 
            icon={Eye} 
            label="Total Views" 
            value={data.totalViews || 0} 
            index={0}
          />
          <StatCard 
            icon={Globe} 
            label="Countries Reached" 
            value={data.uniqueCountries || 0} 
            index={1}
          />
          <StatCard 
            icon={TrendingUp} 
            label="Views / Day" 
            value={data.viewsPerDay || 0} 
            index={2}
          />
          <StatCard 
            icon={Clock}
            label="Last Viewed"
            value={data.lastViewed ? new Date(data.lastViewed).toLocaleDateString() : "—"}
            index={3}
          />
        </div>

        {/* INSIGHTS BAR */}
        {(data.totalViews > 0 || data.uniqueCountries > 0) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <Target className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Performance Insights</h3>
                  <p className="text-sm text-gray-600">
                    Your resume has been viewed {data.totalViews} times across {data.uniqueCountries} countries
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Avg. per Country</p>
                  <p className="text-lg font-bold text-green-800">{derived.avgViewsPerCountry}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Top Country</p>
                  <p className="text-lg font-bold text-green-800">{derived.topCountry}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CHARTS SECTION */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Views Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-green-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-100 to-emerald-50">
                  <TrendingUp className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Views Over Time</h3>
                  <p className="text-sm text-gray-500">Daily view count progression</p>
                </div>
              </div>
            </div>

            {data.viewsTimeline?.length ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.viewsTimeline}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #d1fae5',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#10b981"
                      fill="url(#colorViews)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-gray-500 font-medium">No timeline data available</p>
                <p className="text-sm text-gray-400 mt-1">Views over time will appear here</p>
              </div>
            )}
          </motion.div>

          {/* Country Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-green-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-100 to-emerald-50">
                  <MapPin className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Geographic Distribution</h3>
                  <p className="text-sm text-gray-500">Views by country</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {data.countryDistribution?.length || 0} countries
              </div>
            </div>

            {data.countryDistribution?.length ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.countryDistribution}
                      dataKey="count"
                      nameKey="country"
                      outerRadius={100}
                      innerRadius={40}
                      paddingAngle={2}
                      label={(entry) => `${entry.country}: ${entry.count}`}
                      labelLine={false}
                    >
                      {data.countryDistribution.map((_, i) => (
                        <Cell 
                          key={i} 
                          fill={COLORS[i % COLORS.length]} 
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #d1fae5',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Country List */}
                
              </div>
            ) : (
              <div className="h-[300px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-gray-500 font-medium">No country data available</p>
                <p className="text-sm text-gray-400 mt-1">Geographic distribution will appear here</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* EMPTY STATE */}
        
      </div>
    </div>
  );
};

export default Analytics;