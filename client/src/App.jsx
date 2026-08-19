import React, { useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import api from "./configs/api";
import { login, logout, setLoading } from "./app/Features/authSlice";
import { setOffline, setOnline } from "./app/Features/networkSlice";

import InternetStatusPopup from "./Component/InternetStatusPopup";
import PageLoader from "./Component/skeleton/PageLoader";
import Portfolio from "./pages/Portfolio";
import socket from "./configs/socket";
import OAuthSuccess from "./pages/OAuthSuccess";
import ProtectedRoute from "./pages/ProtectedRoute";





/* ---------------- LAZY ROUTES ---------------- */

const Home = lazy(() => import("./pages/Home"));
const TryDemo = lazy(() => import("./pages/TryDemo"));
const Login = lazy(() => import("./pages/Login"));

const Layout = lazy(() => import("./pages/Layout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Profile = lazy(() => import("./pages/Profile"));
const Analytics = lazy(() => import("./pages/Analytics"));
const EditPdf = lazy(() => import("./pages/EditPdf"));

const Preview = lazy(() => import("./pages/Preview"));


/* ---------------- APP COMPONENT ---------------- */

const App = () => {
  const dispatch = useDispatch();

  const isOnline = useSelector((state) => state.network.isOnline);
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state)=> state.auth.user)

  /* ---------- Restore Logged-in User ---------- */

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        dispatch(setLoading(false));
        return;
      }

      const { data } = await api.get("/api/users/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!data.user?.isVerified) {
        localStorage.removeItem("token");
        dispatch(setLoading(false));
        return;
      }

      dispatch(login({ token, user: data.user }));
      dispatch(setLoading(false));
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(logout());
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
  if (user?._id) {
    socket.emit("join", user._id)
  }
}, [user])



  /* ---------- Online / Offline Detection ---------- */

  useEffect(() => {
    const goOnline = () => dispatch(setOnline());
    const goOffline = () => dispatch(setOffline());

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, [dispatch]);

  /* ---------------- RENDER ---------------- */

  return (
    <>
      <Toaster />

      {/* Show popup only after auth loading complete */}
      {!loading && <InternetStatusPopup isOnline={isOnline} />}

      {/* -------- ROUTE LEVEL LOADING -------- */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/try_demo" element={<TryDemo />} />
          <Route path="/login" element={<Login />} />
          <Route
    path="/oauth-success"
    element={<OAuthSuccess />}
  />

          {/* Protected Layout */}
          <Route element={<ProtectedRoute />}>
          
          <Route path="app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="builder/:resumeId" element={<ResumeBuilder />} />
            <Route path="edit-pdf/:id" element={<EditPdf />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="profile" element={<Profile />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          </Route>

            <Route path="portfolio/:resumeId" element={<Portfolio />} />
          {/* Public Resume Preview */}
          <Route path="view/:resumeId" element={<Preview />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
