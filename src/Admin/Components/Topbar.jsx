import { useNavigate } from "react-router-dom";

const Topbar = () => {
   const navigate = useNavigate();

  const handleLogout = () => {
    // Remove admin token from localStorage
    localStorage.removeItem("adminToken");
    // Optionally remove admin info if stored
    localStorage.removeItem("adminInfo");

    // Redirect to login page
    navigate("/admin/login");
  };
  return (
<div className="flex justify-between items-center px-8 py-4
                 shadow-sm">

  {/* College Name */}
  <h2
  className="text-3xl font-bold text-[#090b29] tracking-wide"
  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
>
  Smt. P.N. Doshi Women's College
</h2>


  {/* Right actions */}
  <div className="flex items-center gap-4">

    {/* Admin pill */}
    <div className="flex items-center gap-2
                    bg-white/15 px-4 py-2 rounded-full
                     text-sm font-medium">
      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
      Admin
    </div>

    {/* Logout */}
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600
                 text-white px-4 py-2 rounded-full
                 text-sm font-semibold transition"
    >
      Logout
    </button>

  </div>
</div>


  );
};

export default Topbar;
