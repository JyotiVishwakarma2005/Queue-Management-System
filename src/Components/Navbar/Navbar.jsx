import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/image.png";
import { House } from 'lucide-react';
import { Info } from 'lucide-react';
import { Phone } from 'lucide-react';
import { User } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#341C4E] text-white px-6 py-5 flex justify-between">
      <div className="flex justify-center items-center">
 <img
          src={logo}
          alt="logo"
          className="h-20 w-20 rounded-full ml-4"
        />
        <div className="flex flex-col">
 <h2 className="text-amber-100">SMT PN DOSHI WOMEN'S COLLEGE OF ARTS</h2>
 <h3 className="text-amber-100">MANAGED BY SPRJ KANYASHALA TRUST</h3>
 <p className="text-amber-100">Awarded as Best College 2021-2022 by SNDT Women's University</p>
 </div>
        <div>
           
        </div>
        {/* Left Links */}
        <div>
        <ul className="hidden md:flex gap-8 text-md font-semibold ml-40">
          <li className="flex justify-center items-center "><Link to="/" className="hover:text-gray-300 flex justify-center items-center"><House />Home</Link></li>
          <li><Link to="/Aboutus" className="hover:text-gray-300 flex justify-center items-center"><Info />About Us</Link></li>
          <li><Link to="/Contact" className="hover:text-gray-300 flex justify-center items-center"><Phone />Contact</Link></li>
          <li><Link to="/Profile" className="hover:text-gray-300 flex justify-center items-center"><User />Profile</Link></li>
        </ul>
</div>
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-1 bg-white"></span>
          <span className="w-6 h-1 bg-white"></span>
          <span className="w-6 h-1 bg-white"></span>
          <span className="w-6 h-1 bg-white"></span>
        </button>

       
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden mt-4 flex flex-col gap-4 text-lg font-semibold bg-[#462564] p-4 rounded-lg">
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/aboutus" onClick={() => setOpen(false)}>About Us</Link></li>
          <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
          <li><Link to="/profile" onClick={() => setOpen(false)}>Profile</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;