import { useNotifications } from "../../context/NotificationContext";

import { useNavigate } from "react-router-dom";


const NotificationBell = () => {
  const { notifications } = useNotifications();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notifications");
  };

  return (
    <div className="relative">
      <button className="relative" onClick={handleClick}>
        🔔
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 rounded-full bg-red-600 text-white text-xs px-1">
            {notifications.length}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationBell;


