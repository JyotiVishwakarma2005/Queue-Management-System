
import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket"; // adjust your path

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen to server events
    socket.on("token_updated", (updatedToken) => {
      console.log("🔔 New token update received:", updatedToken);

      // Prepend the notification to the list
      setNotifications((prev) => [
        {
          serviceName: updatedToken.serviceName,
          message: `Your token is now ${updatedToken.status}`,
          createdAt: updatedToken.updatedAt || new Date(),
        },
        ...prev,
      ]);
    });

    // Clean up listener to avoid duplicates
    return () => socket.off("token_updated");
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
