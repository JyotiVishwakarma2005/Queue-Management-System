import { NavLink } from "react-router-dom";
import { TicketCheck, Train, Book, Coffee, Wallet, Settings ,CircleCheckBig} from "lucide-react";
import { MessageSquareWarning, Star } from "lucide-react";

const Sidebar = () => {


  return (
   <div className="w-65 bg-[#341C4E] h-screen shadow-md p-4">

      <NavLink to="/admin/dashboard" className="flex justify-center items-center py-2  bg-amber-200 rounded text-[#341C4E] font-bold mb-3 inset-shadow-sm inset-shadow-indigo-500/50">Dashboard</NavLink>
      <NavLink to="/admin/admission" className="flex py-1 gap-3 text-white hover:bg-white hover:text-black hover:font-bold transition duration-300 ease-in-out hover:rounded m-2"><TicketCheck/>Admission Tokens</NavLink>
      <hr class="border-gray-300"></hr>
      <NavLink to="/admin/railway" className="flex py-1 gap-3 text-white hover:bg-white hover:text-black hover:font-bold transition duration-300 ease-in-out hover:rounded m-2"><Train/>Railway Tokens</NavLink>
      <hr class="border-gray-300"></hr>
      <NavLink to="/admin/library" className="flex py-1 gap-3 text-white hover:bg-white hover:text-black hover:font-bold transition duration-300 ease-in-out hover:rounded m-2"><Book/>Library Tokens</NavLink>
      <hr class="border-gray-300"></hr>
      <NavLink to="/admin/canteen" className="flex py-1 gap-3 text-white hover:bg-white hover:text-black hover:font-bold transition duration-300 ease-in-out hover:rounded m-2"><Coffee/>Canteen Tokens</NavLink>
      <hr class="border-gray-300"></hr>
      <NavLink to="/admin/fees" className="flex py-1 gap-3 text-white hover:bg-white hover:text-black hover:font-bold transition duration-300 ease-in-out hover:rounded m-2"><Wallet/>Fees Payment Tokens</NavLink>
      <hr class="border-gray-300"></hr>
      <NavLink to="/admin/completed" className="flex py-1 gap-3 text-white hover:bg-white hover:text-black hover:font-bold transition duration-300 ease-in-out hover:rounded m-2"> <CircleCheckBig />Completed Tokens</NavLink>
      <hr class="border-gray-300"></hr>
<NavLink
  to="/admin/complaints"
  className="flex py-1 gap-3 text-white hover:bg-white hover:text-black hover:font-bold transition duration-300 ease-in-out hover:rounded m-2"
>
  <MessageSquareWarning /> Complaints
</NavLink>

<hr className="border-gray-300" />

<NavLink
  to="/admin/feedback"
  className="flex py-1 gap-3 text-white hover:bg-white hover:text-black hover:font-bold transition duration-300 ease-in-out hover:rounded m-2"
>
  <Star /> Feedback
</NavLink>
 <hr class="border-gray-300"></hr>
<NavLink to="/admin/settings" className="flex py-1 gap-3 text-white hover:bg-white hover:text-black hover:font-bold transition duration-300 ease-in-out hover:rounded m-2"><Settings/>Settings</NavLink>

    </div>
  );
};

export default Sidebar;
