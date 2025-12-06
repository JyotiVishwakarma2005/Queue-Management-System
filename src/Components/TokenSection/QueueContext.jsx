

import { createContext, useState } from "react";

export const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [token, setToken] = useState(null); // store only generated token

  return (
    <QueueContext.Provider value={{ token, setToken }}>
      {children}
    </QueueContext.Provider>
  );
};

