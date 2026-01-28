import { useEffect, createContext, useState } from "react";
import { socket } from "./socket";
import { playNotificationSound } from "./Utils/NotificationSound";
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // ✅ mark single notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // ✅ mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

useEffect(() => {
  const userId = localStorage.getItem("queueUserId");
  if (!userId) return;

  socket.emit("join", userId);

  // const handleNotification = (data) => {
  //   console.log("🔔 Notification received:", data);

  //   playNotificationSound(); // 🔊 PLAY SOUND HERE

  //   setNotifications((prev) => [
  //     {
  //       id: Date.now(),
  //       serviceName: data.serviceName,
  //       message: `Your token is  ${data.status}`,
  //       createdAt: data.updatedAt || new Date(),
  //       read: false,
  //     },
  //     ...prev,
  //   ]);
  // };
const handleNotification = (data) => {
  console.log("🔔 Notification received:", data);

  playNotificationSound();

  setNotifications((prev) => [
    {
      id: Date.now(),
      service: data.service,              // ✅ FIXED
      message: data.message,              // ✅ use socket message
      createdAt: data.createdAt || new Date(),
      read: false,
    },
    ...prev,
  ]);
};



  socket.on("token_updated", handleNotification);

  return () => {
    socket.off("token_updated", handleNotification);
  };
}, []);



  useEffect(() => {
  socket.on("new-notification", (data) => {
    playNotificationSound(); // 🔔 sound here
    setNotifications((prev) => [data, ...prev]);
  });

  return () => socket.off("new-notification");
}, []);


  return (
    <SocketContext.Provider
      value={{ notifications, markAsRead, markAllAsRead }}
    >
      {children}
    </SocketContext.Provider>
  );
};
