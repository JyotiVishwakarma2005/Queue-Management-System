import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./Components/Navbar/Navbar";

import AboutUs from "./Components/Navbar/Aboutus";
import Contact from "./Components/Navbar/Contact";
import Main from "./Components/Navbar/Main";

import LoginPopup from "./Components/UserLogin/LoginPopup";

import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import TokenCategory from "./Admin/TokenCategory";
import AdminLogin from "./Admin/AdminLogin";

import AdmissionTokens from "./Admin/Components/AdmissionToken";
import RailwayTokens from "./Admin/Components/RailwayTokens";
import LibraryTokens from "./Admin/Components/LibraryTokens";
import CanteenTokens from "./Admin/Components/CanteenTokens";
import FeesTokens from "./Admin/Components/FeesTokens";
import CompletedTokens from "./Admin/Components/CompletedTokens";
import Settings from "./Admin/Components/Settings";
import { socket } from "./socket";
import { initNotificationSound } from "../src/Utils/NotificationSound";

import NotificationsPage from "./Components/Navbar/NotificationPage";
import Profile from "./Components/Navbar/Profile";
import TokenHistory from "./Components/Navbar/TokenHistory";
import Complaint from "./Components/Navbar/Complaint";
import Feedback from "./Components/Navbar/Feedback";
import Complaints from "./Admin/Components/Complaints";
import FeedbackAdmin from "./Admin/Components/Feedback";
const AppWrapper = () => {
  const location = useLocation();

  // Check if URL starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [forceLoginPopup, setForceLoginPopup] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setForceLoginPopup(true);
    window.location.reload();
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Connected to WebSocket:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    const unlockSound = () => {
      initNotificationSound();
      window.removeEventListener("click", unlockSound);
    };

    window.addEventListener("click", unlockSound);

    return () => {
      window.removeEventListener("click", unlockSound);
    };
  }, []);

  return (
    <>
      {/* Hide navbar on admin pages */}
      {!isAdminRoute && <Navbar onLogout={handleLogout} />}

      <LoginPopup forceOpen={forceLoginPopup} />

      <Routes>
        {/* Client Side Routes */}
        <Route path="/" element={<Main />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/feedback" element={<Feedback />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/token-history" element={<TokenHistory />} />

        {/* Admin Login (no layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/admission" element={<AdmissionTokens />} />
          <Route path="/admin/railway" element={<RailwayTokens />} />
          <Route path="/admin/library" element={<LibraryTokens />} />
          <Route path="/admin/canteen" element={<CanteenTokens />} />
          <Route path="/admin/fees" element={<FeesTokens />} />
          <Route path="/admin/completed" element={<CompletedTokens />} />
          <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/complaints" element={<Complaints />} />
    <Route path="/admin/feedback" element={<FeedbackAdmin />} />
        </Route>
      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);

export default App;
