import { useEffect, createContext, useState } from "react";
import { socket } from "./socket";

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
    console.log("🟢 Joined socket room:", userId);

    const handleTokenUpdate = (data) => {
      console.log("🔔 Token update received:", data);

      setNotifications((prev) => [
        {
          id: Date.now(),
          serviceName: data.serviceName,
          message: `Your token is ${data.status}`,
          createdAt: data.updatedAt || new Date(),
          read: false,
        },
        ...prev,
      ]);
    };

    socket.on("token_updated", handleTokenUpdate);

    return () => {
      socket.off("token_updated", handleTokenUpdate);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ notifications, markAsRead, markAllAsRead }}
    >
      {children}
    </SocketContext.Provider>
  );
};
