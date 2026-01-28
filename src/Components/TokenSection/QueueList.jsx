// import { useEffect, useState } from "react";
// import axios from "axios";

// const QueueList = () => {
//   const [queue, setQueue] = useState([]);

//   const fetchQueue = async () => {
//     const res = await axios.get("http://localhost:5000/api/token/list");
//     setQueue(res.data.filter((q) => q.status !== "cancelled"));
//   };

//   useEffect(() => {
//     fetchQueue();
//     const refresh = setInterval(fetchQueue, 3000);
//     return () => clearInterval(refresh);
//   }, []);

//   return (
//     <div className="mt-6 bg-white p-4 shadow rounded max-w-lg w-full">
//       <h2 className="text-xl font-bold mb-3">Current Queue</h2>
//       {queue.map((t) => (
//         <div key={t._id} className="p-2 border-b flex justify-between">
//           <span>Token #{t.tokenNumber}</span>
//           <span>{t.serviceName}</span>
//           <span>{t.userName}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default QueueList;

import { useEffect, useState } from "react";
import axios from "axios";

const servicePrefixes = {
  Admission: "Ad",
  RailwayConsession: "Rc",
  Library: "L",
  Canteen: "C",
  FeesPayment: "Fp",
};

const QueueList = () => {
  const [queue, setQueue] = useState([]);

  const fetchQueue = async () => {
    const res = await axios.get("http://localhost:5000/api/token/list");
    // Filter cancelled just in case backend didn't
    setQueue(res.data.filter((q) => q.status !== "cancelled"));
  };

  useEffect(() => {
    fetchQueue();
    const refresh = setInterval(fetchQueue, 3000);
    return () => clearInterval(refresh);
  }, []);

  return (
    <div className="mt-6 bg-white p-4 shadow rounded max-w-lg w-full">
      <h2 className="text-xl font-bold mb-3">Current Queue</h2>

      {queue.length === 0 && <p className="text-gray-500">No tokens in queue</p>}

      {queue.map((t, i) => (
        <div key={t._id} className="p-2 border-b flex justify-between items-center">
          <span className="font-bold">
            {/* prefix + number */}
            {servicePrefixes[t.serviceName]}-{t.tokenNumber}
          </span>

          <span className="text-blue-600 font-medium">{t.userName}</span>

         <span
  className={`text-xs px-3 py-1 rounded-full 
  ${item.status === "serving" ? "bg-green-600 text-white" : ""}
  ${item.status === "pending" ? "bg-gray-300 text-gray-900" : ""}
  ${item.status === "cancelled" ? "bg-red-600 text-white" : ""}
  `}
>
  {item.status === "cancelled" ? "Cancelled"
   : item.status === "serving" ? "Now Serving"
   : "Waiting"}
</span>
        </div>
      ))}
    </div>
  );
};

export default QueueList;

