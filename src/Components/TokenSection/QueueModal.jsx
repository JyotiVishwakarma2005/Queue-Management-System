// import React from "react";

// const QueueModal = ({ show, onClose, serviceName, queue }) => {
//   if (!show) return null;

//   const SERVICE_TIME = {
//   Admission: 25,
//   "railwayConsession": 10,
//   Library: 3,
//   "Canteen": 2,
//   "FeesPayment": 7,
// }; // minutes for each token
// const avgTime = SERVICE_TIME[serviceName] || 3;
//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex justify-center items-center px-3">
//       <div className="relative bg-white w-full max-w-lg rounded-xl shadow-xl animate-slideDown">
        
//         {/* Close Btn */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-red-500"
//         >
//           ×
//         </button>

//         {/* Header */}
//         <div className="p-4 border-b flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-semibold">{serviceName} - Current Queue</h2>
//             <p className="text-gray-500 text-sm">
//               {queue.length} in queue • Avg ~{avgTime} min/token
//             </p>
//           </div>
//         </div>

//         <div className="max-h-[60vh] overflow-y-auto px-4 py-3 space-y-3">
//   {queue.map((item, idx) => {
//     const isServing = idx === 0 && item.status !== "Canceled";
//     const eta = idx * avgTime;

//     // Status Badge Colors
//     const badgeColor =
//       item.status === "Canceled"
//         ? "bg-red-600 text-white"
//         : isServing
//         ? "bg-green-600 text-white"
//         : "bg-gray-200 text-gray-700";

//     // Card background based on status
//     const cardStyle =
//       item.status === "Canceled"
//         ? "bg-red-50 border-red-300"
//         : isServing
//         ? "bg-green-50 border-green-400 shadow-sm"
//         : "bg-gray-50 border-gray-300";

//     return (
//       <div
//         key={item._id}
//         className={`border rounded-lg flex justify-between items-center p-3 transition-all ${cardStyle}`}
//       >
//         <div>
//           <p className="font-bold text-lg">{item.displayToken}</p>

//           <p className="text-sm text-gray-500">
//             {item.status === "Canceled"
//               ? "Canceled"
//               : isServing
//               ? "Now"
//               : `~${eta} min`}
//           </p>
//         </div>

//         <span className={`text-xs px-3 py-1 rounded-full ${badgeColor}`}>
//           {item.status}
//         </span>
//       </div>
//     );
//   })}
// </div>

//         {/* Footer */}
//         <div className="text-center text-gray-500 text-sm p-2 border-t">
//           Queue updates automatically. Please arrive 2 tokens earlier.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QueueModal;


import React from "react";

const QueueModal = ({ show, onClose, serviceName, queue }) => {
  if (!show) return null;

  const SERVICE_TIME = {
    Admission: 25,
    railwayConsession: 10,
    Library: 3,
    Canteen: 2,
    FeesPayment: 7,
  }; // minutes for each token

  const avgTime = SERVICE_TIME[serviceName] || 3;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex justify-center items-center px-3">
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-xl animate-slideDown">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-red-500"
        >
          ×
        </button>

        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{serviceName} - Current Queue</h2>
            <p className="text-gray-500 text-sm">
              {queue.length} in queue • Avg ~{avgTime} min/token
            </p>
          </div>
        </div>

        {/* Queue List */}
        <div className="max-h-[60vh] overflow-y-auto px-4 py-3 space-y-3">
          {queue.map((item, idx) => {
            const isCanceled = item.status.toLowerCase() === "cancelled";
            const isServing = idx === 0 && !isCanceled;
            const eta = idx * avgTime;

            // Status Badge Colors
            const badgeColor = isCanceled
              ? "bg-red-600 text-white"
              : isServing
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700";

            // Card background based on status
            const cardStyle = isCanceled
              ? "bg-red-50 border-red-300"
              : isServing
              ? "bg-green-50 border-green-400 shadow-sm"
              : "bg-gray-50 border-gray-300";

            return (
              <div
                key={item._id}
                className={`border rounded-lg flex justify-between items-center p-3 transition-all ${cardStyle}`}
              >
                <div>
                  <p className="font-bold text-lg">{item.displayToken}</p>
                  <p className="text-sm text-gray-500">
                    {isCanceled ? "Cancelled" : isServing ? "Now" : `~${eta} min`}
                  </p>
                </div>

                <span className={`text-xs px-3 py-1 rounded-full ${badgeColor}`}>
                  {isCanceled ? "Cancelled" : item.status}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm p-2 border-t">
          Queue updates automatically. Please arrive 2 tokens earlier.
        </div>
      </div>
    </div>
  );
};

export default QueueModal;
