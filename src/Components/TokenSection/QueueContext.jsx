import { createContext, useState } from "react";

export const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [queues, setQueues] = useState({
    canteen: [],
    library: [],
    admission: [],
    hostel: [],
    card: []
  });

  const servicePrefixes = {
  Admission: "Ad",
  RailwayConsession: "Rc",
  Library: "L",
  Canteen: "C",
  FeesPayment: "Fp",
};

 
  const generateToken = (serviceName) => {
    const prefix = servicePrefixes[serviceName] || "T";
    const currentQueue = queues[serviceName] || [];
    const tokenNumber = currentQueue.length + 1;
     const token = `${prefix}-${200 + tokenNumber}`; // Unique Format (T-278 etc.)

    // Add to queue
    setQueues({
      ...queues,
      [serviceName]: [...currentQueue, token]
    });

    return token; // return for modal display
  };

  return (
    <QueueContext.Provider value={{ queues, generateToken }}>
      {children}
    </QueueContext.Provider>
  );
};
