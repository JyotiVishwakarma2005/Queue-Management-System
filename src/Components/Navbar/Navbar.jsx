import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/image.png";
import { House, Info, Phone, User } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="bg-[#341C4E] text-white px-6 py-4 flex justify-between items-center">
        
        {/* Left Section → Logo + Text */}
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="logo"
            className="h-16 w-16 rounded-full"
          />

          {/* College Text (Hidden on small screens) */}
          <div className="hidden md:flex flex-col leading-tight">
            <h2 className="text-amber-100 text-sm font-semibold">
              SMT PN DOSHI WOMEN'S COLLEGE OF ARTS
            </h2>
            <h3 className="text-amber-100 text-xs">
              MANAGED BY SPRJ KANYASHALA TRUST
            </h3>
            <p className="text-amber-100 text-xs">
              Awarded as Best College 2021-2022 by SNDT Women's University
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-md font-semibold">
          <li><Link to="/" className="hover:text-gray-300 flex items-center gap-1"><House size={18}/>Home</Link></li>
          <li><Link to="/Aboutus" className="hover:text-gray-300 flex items-center gap-1"><Info size={18}/>About Us</Link></li>
          <li><Link to="/Contact" className="hover:text-gray-300 flex items-center gap-1"><Phone size={18}/>Contact</Link></li>
          <li><Link to="/Profile" className="hover:text-gray-300 flex items-center gap-1"><User size={18}/>Profile</Link></li>
        </ul>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-1 bg-white"></span>
          <span className="w-6 h-1 bg-white"></span>
          <span className="w-6 h-1 bg-white"></span>
        </button>

      </nav>

      {/* Mobile Menu (Opens BELOW the navbar) */}
      {open && (
        <ul className="md:hidden bg-[#462564] text-white flex flex-col gap-4 text-lg font-semibold p-4 shadow-lg">
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/aboutus" onClick={() => setOpen(false)}>About Us</Link></li>
          <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
          <li><Link to="/profile" onClick={() => setOpen(false)}>Profile</Link></li>
        </ul>
      )}
    </>
  );
};

export default Navbar;
