import { NavLink } from "react-router-dom";
import { TicketCheck, Train, Book, Coffee, Wallet, Settings ,CircleCheckBig} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Admission Tokens", path: "/admin/admission", icon: "🎓" },
    { name: "Railway Tokens", path: "/admin/railway", icon: "🚆" },
    { name: "Library Tokens", path: "/admin/library", icon: "📚" },
    { name: "Canteen Tokens", path: "/admin/canteen", icon: "🍽️" },
    { name: "Fees Payment Tokens", path: "/admin/fees", icon: "💳" },
    { name: "Completed Tokens", path: "/admin/completed", icon: "✔️" },
    { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  return (
   <div className="w-60 bg-amber-200 h-screen shadow-md p-4">

      <NavLink to="/admin/dashboard" className="flex justify-center items-center py-2 bg-cyan-950 text-amber-50 font-bold">Dashboard</NavLink>
      <NavLink to="/admin/admission" className="flex py-4 gap-3"><TicketCheck/>Admission Tokens</NavLink>
      <hr class="border-gray-300"></hr>
      <NavLink to="/admin/railway" className="flex py-4 gap-3"><Train/>Railway Tokens</NavLink>
      <hr class="border-gray-300"></hr>
      <NavLink to="/admin/library" className="flex py-4 gap-3"><Book/>Library Tokens</NavLink>
      <hr class="border-gray-300"></hr>
      <NavLink to="/admin/canteen" className="flex py-4 gap-3"><Coffee/>Canteen Tokens</NavLink>
      <hr class="border-gray-300"></hr>
      <NavLink to="/admin/fees" className="flex py-4 gap-3"><Wallet/>Fees Payment Tokens</NavLink>
      <hr class="border-gray-300"></hr>
      <NavLink to="/admin/completed" className="flex py-4 gap-3"> <CircleCheckBig />Completed Tokens</NavLink>
      <hr class="border-gray-300"></hr>
      <NavLink to="/admin/settings" className="flex py-4 gap-3"><Settings/>Settings</NavLink>

    </div>
  );
};

export default Sidebar;
