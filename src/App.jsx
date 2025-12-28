
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

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

