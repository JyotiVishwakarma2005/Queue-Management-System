import { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../socket.js";

const NotificationContext = createContext();

export const NotificationProvider = ({ userName, children }) => {
  const [notifications, setNotifications] = useState([]);

useEffect(() => {
  if (!userName) return;

  socket.emit("join", userName);

  const handleNotification = (notif) => {
    console.log("🔔 Notification received:", notif); // Check if this logs
    setNotifications((prev) => [notif, ...prev]);
  };

  socket.on("new_notification", handleNotification);

  return () => {
    socket.off("new_notification", handleNotification);
  };
}, [userName]);


  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

// ✅ Custom hook to access notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
};
