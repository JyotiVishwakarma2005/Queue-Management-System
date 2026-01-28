import React, { useState, useEffect } from "react";

const statusStyles = {
  pending: "bg-yellow-200 text-yellow-800",
  serving: "bg-blue-200 text-blue-800",
  completed: "bg-green-200 text-green-800",
  cancelled: "bg-red-200 text-red-800",
};
const FeesPayment = () => {
  const [tokens, setTokens] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
    const [selectedToken, setSelectedToken] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // updates every second
  
    return () => clearInterval(interval);
  }, []);

  const handleView = (token) => {
  setSelectedToken(token);
  setShowViewModal(true);
};

  // Fetch tokens
  const fetchTokens = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/tokens/list/FeesPayment"
      );
      const data = await res.json();
      setTokens(data);
    } catch (err) {
      console.log("Error fetching tokens", err);
    }
  };
  const fetchAccessStatus = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/tokens/service/FeesPayment/access"
      );
      const data = await res.json();
      setIsOpen(data.isOpen);
    } catch (err) {
      console.log("Error fetching access status", err);
    }
  };

  useEffect(() => {
    fetchTokens();
    fetchAccessStatus();
  }, []);

  // Update status
  const updateStatus = async (tokenNumber, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tokens/FeesPayment/status/${tokenNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const updatedToken = await res.json();

      setTokens((prev) =>
        prev.map((t) =>
          t.tokenNumber === updatedToken.tokenNumber ? updatedToken : t
        )
      );
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  const toggleAccess = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/tokens/service/FeesPayment/access",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isOpen: !isOpen }),
        }
      );

      const data = await res.json();
      setIsOpen(data.isOpen);
    } catch (err) {
      console.log("Error toggling access", err);
    }
  };

  const handleProcess = (tokenNumber) => updateStatus(tokenNumber, "serving");

  const handleComplete = (tokenNumber) =>
    updateStatus(tokenNumber, "completed");

  const handleReject = (tokenNumber) => updateStatus(tokenNumber, "cancelled");

const getDuration = (start, end) => {
  if (!start || !end || isNaN(start) || isNaN(end)) return "0m 0s";

  const diff = Math.max(0, Math.floor((end - start) / 1000));

  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;

  return `${minutes}m ${seconds}s`;
};
const getQueuePositionAtEntry = (token) => {
  if (!token || !tokens.length) return "--";

  const tokenTime = new Date(token.time);

  return (
    tokens.filter(
      (t) =>
        t.serviceName === token.serviceName &&
        new Date(t.time) <= tokenTime
    ).length
  );
};



  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Fees Payment Tokens</h1>
        <button
          onClick={toggleAccess}
          className={`px-4 py-2 ml-[52%] rounded ${
            isOpen ? "bg-red-600" : "bg-green-600"
          } text-white`}
        >
          {isOpen ? "Disable Tokens" : "Enable Tokens"}
        </button>
        <button
          onClick={fetchTokens}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>

     Total Tokens:{" "}
<b>
  {
    tokens.filter(
      (token) =>
        token.status?.toLowerCase() !== "completed" &&
        token.status?.toLowerCase() !== "cancelled"
    ).length
  }
</b>

      <div className="space-y-4">
        {tokens.map((token) => (
          <div
            key={token._id}
            className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
          >
            {/* LEFT SECTION */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`font-bold ${
                    statusStyles[token.status?.toLowerCase()] || ""
                  } px-2 py-1 rounded-full`}
                >
                  {token.displayToken}
                </span>

                <span
                  className={`text-sm ${
                    statusStyles[token.status?.toLowerCase()] || ""
                  } px-2 py-1 rounded-full`}
                >
                  {token.status}
                </span>
              </div>

              <p className="font-semibold">{token.userName}</p>
              <p className="text-sm text-gray-600">
                Service: {token.serviceName}
              </p>
              <p className="text-sm text-gray-600">
                Time: {new Date(token.time).toLocaleString()}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-2">
              <button
                onClick={() => handleView(token)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                View
              </button>
              <button
                className="bg-blue-500 px-3 py-1 rounded text-white"
                onClick={() => handleProcess(token.tokenNumber)}
              >
                Process
              </button>

              <button
                className="bg-green-600 px-3 py-1 rounded text-white"
                onClick={() => handleComplete(token.tokenNumber)}
              >
                Complete
              </button>

              <button
                className="bg-red-500 px-3 py-1 rounded text-white"
                onClick={() => handleReject(token.tokenNumber)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
       {showViewModal && selectedToken && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Token Details</h2>

      <p><b>Token:</b> {selectedToken.displayToken}</p>
      <p><b>User:</b> {selectedToken.userName}</p>
      <p><b>Service:</b> {selectedToken.serviceName}</p>
      <p><b>Status:</b> {selectedToken.status}</p>
      <p>
        <b>Time:</b>{" "}
        {new Date(selectedToken.time).toLocaleString()}
      </p>

      {/* METRICS */}
<div className="grid grid-cols-3 gap-4 mt-4">

  {/* Waiting Time */}
  <div className="bg-blue-50 p-3 rounded-lg text-center">
    <p className="text-xs text-gray-500">Waiting Time</p>
     <p className="font-bold text-blue-700">
  {getDuration(
    new Date(selectedToken.time),
    selectedToken.status === "pending" || !selectedToken.servedAt
      ? currentTime
      : new Date(selectedToken.servedAt)
  )}
</p>
  </div>

  {/* Service Time */}
  <div className="bg-green-50 p-3 rounded-lg text-center">
    <p className="text-xs text-gray-500">Service Time</p>
     <p className="font-bold text-blue-700">
  {selectedToken.status === "serving"
    ? getDuration(new Date(selectedToken.time), currentTime)
    : selectedToken.status === "completed" && selectedToken.completedAt
    ? getDuration(
        new Date(selectedToken.time),
        new Date(selectedToken.completedAt)
      )
    : "0m 0s"}
</p>
  </div>

  {/* Queue Position */}
  <div className="bg-purple-50 p-3 rounded-lg text-center">
    <p className="text-xs text-gray-500">Queue Position</p>
    <p className="font-bold text-purple-700">
      {getQueuePositionAtEntry(selectedToken)}
    </p>
  </div>

</div>


      <button
        className="mt-4 bg-red-500 text-white px-4 py-1 rounded"
        onClick={() => setShowViewModal(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default FeesPayment;
