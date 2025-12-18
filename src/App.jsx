import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import AboutUs from "./Components/Navbar/Aboutus";
import Contact from "./Components/Navbar/Contact";
import Main from "./Components/Navbar/Main";

import LoginPopup from "./Components/UserLogin/LoginPopup";




const App = () => {
  const [forceLoginPopup, setForceLoginPopup] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setForceLoginPopup(true);
    window.location.reload();
  };
  return (
    <>
    {/* <QueueProvider> */}
    <BrowserRouter>
    <Navbar onLogout={handleLogout}/>
   <LoginPopup forceOpen={forceLoginPopup} />


      <Routes>
        <Route path="/" element={<Main />}/> 
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
