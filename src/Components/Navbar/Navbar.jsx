// import { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../../assets/Images/image.png";
// import { House, Info, Phone } from "lucide-react";
// import LoginPopup from "../UserLogin/LoginPopup";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
// const [showSignup, setShowSignup] = useState(false);

//   const handleLogout = () => {
//    localStorage.clear();

//     setShowSignup(true);
//   };

//   return (
//     <>
//       {/* TOP NAVBAR */}
//       <nav className="bg-[#341C4E] text-white px-6 py-4 flex justify-between items-center">
        
//         {/* Left Section → Logo + Text */}
//         <div className="flex items-center gap-4">
//           <img
//             src={logo}
//             alt="logo"
//             className="h-16 w-16 rounded-full"
//           />

//           {/* College Text (Hidden on small screens) */}
//           <div className="hidden md:flex flex-col leading-tight">
//             <h2 className="text-amber-100 text-sm font-semibold">
//               SMT PN DOSHI WOMEN'S COLLEGE OF ARTS
//             </h2>
//             <h3 className="text-amber-100 text-xs">
//               MANAGED BY SPRJ KANYASHALA TRUST
//             </h3>
//             <p className="text-amber-100 text-xs">
//               Awarded as Best College 2021-2022 by SNDT Women's University
//             </p>
//           </div>
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex gap-8 text-md font-semibold items-center">
//           <li><Link to="/" className="hover:text-gray-300 flex items-center gap-1"><House size={18}/>Home</Link></li>
//           <li><Link to="/Aboutus" className="hover:text-gray-300 flex items-center gap-1"><Info size={18}/>About Us</Link></li>
//           <li><Link to="/Contact" className="hover:text-gray-300 flex items-center gap-1"><Phone size={18}/>Contact</Link></li>
//           {/* <li><Link to="/Profile" className="hover:text-gray-300 flex items-center gap-1"><User size={18}/>Profile</Link></li> */}
//           <button className="px-2 h-10 border-2 rounded-2xl hover:bg-amber-50 hover:text-[#341C4E]" onClick={handleLogout}>Logout</button>
//         </ul>

//         {/* Hamburger Button (Mobile) */}
//         <button
//           className="md:hidden flex flex-col gap-1"
//           onClick={() => setOpen(!open)}
//         >
//           <span className="w-6 h-1 bg-white"></span>
//           <span className="w-6 h-1 bg-white"></span>
//           <span className="w-6 h-1 bg-white"></span>
//         </button>

//       </nav>

//       {/* Mobile Menu (Opens BELOW the navbar) */}
//       {open && (
//         <ul className="md:hidden bg-[#462564] text-white flex flex-col gap-4 text-lg font-semibold p-4 shadow-lg">
//           <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
//           <li><Link to="/aboutus" onClick={() => setOpen(false)}>About Us</Link></li>
//           <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
//           {/* <li><Link to="/profile" onClick={() => setOpen(false)}>Profile</Link></li> */}
//           <button className="px-2 h-10 border-2 rounded-2xl hover:bg-amber-50 hover:text-[#341C4E]" onClick={handleLogout}>Logout</button>
//         </ul>
//       )}
//     </>
//   );
// };

// export default Navbar;
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/image.png";
import { House, Info, Phone } from "lucide-react";

const Navbar = ({ onLogout }) => {
  const [open, setOpen] = useState(false);


const handleLogout = () => {
  localStorage.clear();
  window.location.reload(); // open login popup
};

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="bg-[#341C4E] text-white px-6 py-4 flex justify-between items-center">
        
        {/* Left Section → Logo + Text */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-16 w-16 rounded-full" />

          {/* College Text */}
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
        <ul className="hidden md:flex gap-8 text-md font-semibold items-center">
          <li><Link to="/" className="hover:text-gray-300 flex items-center gap-1"><House size={18}/>Home</Link></li>
          <li><Link to="/Aboutus" className="hover:text-gray-300 flex items-center gap-1"><Info size={18}/>About Us</Link></li>
          <li><Link to="/Contact" className="hover:text-gray-300 flex items-center gap-1"><Phone size={18}/>Contact</Link></li>

          {/* Logout */}
          <button 
            className="px-2 h-10 border-2 rounded-2xl hover:bg-amber-50 hover:text-[#341C4E]" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </ul>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-1 bg-white"></span>
          <span className="w-6 h-1 bg-white"></span>
          <span className="w-6 h-1 bg-white"></span>
        </button>

      </nav>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-[#462564] text-white flex flex-col gap-4 text-lg font-semibold p-4 shadow-lg">
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/aboutus" onClick={() => setOpen(false)}>About Us</Link></li>
          <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>

          {/* Logout Mobile */}
          <button 
            className="px-2 h-10 border-2 rounded-2xl hover:bg-amber-50 hover:text-[#341C4E]" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </ul>
      )}
    </>
  );
};

export default Navbar;

