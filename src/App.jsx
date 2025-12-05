import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import AboutUs from "./Components/Navbar/Aboutus";
import Contact from "./Components/Navbar/Contact";
import Main from "./Components/Navbar/Main";
import Profile from "./Components/Navbar/Profile";
import Hero from "./Components/HeroSection/Hero";
import Token from "./Components/TokenSection/Token";
import Footer from "./Components/Footer/Footer";
import { QueueProvider } from "./Components/TokenSection/QueueContext";
import LoginPopup from "./Components/UserLogin/LoginPopup";
import TokenCard from "./Components/TokenSection/TokenCard";
import TokenForm from "./Components/TokenSection/TokenForm";
import QueueList from "./Components/TokenSection/QueueList";



const App = () => {
   const handleLogin = (user) => {
    console.log("User Logged In:", user);
    // store roles, validate student/admin, generate token, etc.
  };
    
  return (
    <>
    <QueueProvider>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Main />}/> 
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    <Hero/>
    <Token />
    <Footer/>
  </QueueProvider>
  <LoginPopup onLogin={handleLogin} />
    </>
  );
};

export default App;
