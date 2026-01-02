import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../socketProvider.jsx";

const NotificationBell = () => {
  const { notifications } = useContext(SocketContext);
  const navigate = useNavigate();
const unreadCount = notifications.filter(n => !n.read).length;

  const handleClick = () => {
    navigate("/notifications");
  };

  return (
    <div className="relative">
      <button className="relative" onClick={handleClick}>
        🔔
        {unreadCount > 0 && (
  <span className="absolute top-0 right-0 rounded-full bg-red-600 text-white text-xs px-1">
    {unreadCount}
  </span>
)}
      
      </button>
    </div>
  );
};

export default NotificationBell;
