import React from "react";

const QueueModal = ({ show, onClose, serviceName, queue }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex justify-center items-center px-3">
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-xl animate-slideDown">
        
        {/* Close Btn */}
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
              {queue.length} in queue • Avg ~3 min/token
            </p>
          </div>
        </div>

        {/* Queue List */}
        <div className="overflow-y-auto p-4 space-y-3">
          {queue.map((item, idx) => (
            <div
              key={idx}
              className={`border rounded-lg flex justify-between items-center p-3 
              ${idx === 0 ? "bg-green-50 border-green-300" : ""}
            `}
            >
              <div>
                <p className="font-semibold">{item.token}</p>
                <p className="text-sm text-gray-500">
                  {idx === 0 ? "Now" : `~${idx * 3} min`}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full 
                ${idx === 0 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}
              `}
              >
                {idx === 0 ? "Now Serving" : "Waiting"}
              </span>
            </div>
          ))}
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
