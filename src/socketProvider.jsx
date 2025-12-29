// SocketProvider.jsx
import { useEffect, createContext, useState } from "react";
import { socket } from "./socket.js";

export const TokenContext = createContext();

export const SocketProvider = ({ children }) => {
  const [updatedToken, setUpdatedToken] = useState(null);

  useEffect(() => {
    const handleUpdate = (token) => {
      console.log("🔔 Realtime token update:", token); // only once
      setUpdatedToken(token);
    };

    socket.on("token_updated", handleUpdate);
    return () => socket.off("token_updated", handleUpdate);
  }, []);

  return (
    <TokenContext.Provider value={{ updatedToken }}>
      {children}
    </TokenContext.Provider>
  );
};
