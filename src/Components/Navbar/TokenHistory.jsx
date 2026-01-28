import { useEffect, useState } from "react";

const statusStyles = {
  pending: "bg-yellow-200 text-yellow-800",
  serving: "bg-blue-200 text-blue-800",
  completed: "bg-green-200 text-green-800",
  cancelled: "bg-red-200 text-red-800",
};

const TokenHistory = () => {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const userId = localStorage.getItem("queueUserId");

useEffect(() => {
  if (!showViewModal || !selectedToken) return;

  // stop timer if service is over
  if (
    selectedToken.status === "completed" ||
    selectedToken.status === "cancelled"
  ) {
    return;
  }

  const interval = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(interval);
}, [showViewModal, selectedToken?.status]);


  // Fetch user tokens
  useEffect(() => {
    if (!userId) return;

    const fetchTokens = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/tokens/user/${userId}`
        );
        const data = await res.json();
        console.log("Fetched tokens:", data);

        // Ensure tokens is always an array
        const tokenArray = Array.isArray(data) ? data : data.tokens || [];
        setTokens(tokenArray);
      } catch (err) {
        console.error("Error fetching user tokens", err);
        setTokens([]);
      }
    };

    fetchTokens();
  }, [userId]);

  // Calculate duration in minutes and seconds
  const getDuration = (start, end) => {
    if (!start || !end) return "0m 0s";
    const diff = Math.max(0, Math.floor((end - start) / 1000));
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}m ${seconds}s`;
  };

  const handleView = (token) => {
    setSelectedToken(token);
    setShowViewModal(true);
  };

 const getWaitingTime = (token) => {
  if (!token?.time) return "0m 0s";

  // waiting stops when service starts
  const end = token.servedAt
    ? new Date(token.servedAt)
    : currentTime;

  return getDuration(new Date(token.time), end);
};

const getServingTime = (token) => {
  if (!token?.servedAt) return "0m 0s";

  let end = currentTime;

  if (
    token.status === "completed" ||
    token.status === "cancelled"
  ) {
    end = new Date(token.completedAt);
  }

  return getDuration(new Date(token.servedAt), end);
};


  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Token History</h2>

      {tokens.length === 0 ? (
        <p className="text-center text-gray-500">No tokens found</p>
      ) : (
        <div className="space-y-4">
          {tokens.map((token) => (
            <div
              key={token._id}
              className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{token.displayToken}</p>
                <p
                  className={`text-sm ${
                    statusStyles[token.status] || ""
                  } px-2 py-1 rounded`}
                >
                  {token.status}
                </p>
                <p className="text-sm text-gray-600">
                  Service: {token.service || token.serviceName}
                </p>
                <p className="text-sm text-gray-600">
                  Generated At:{" "}
                  {new Date(token.createdAt || token.time).toLocaleString()}
                </p>
              </div>

              <div>
                <button
                  onClick={() => handleView(token)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedToken && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Token Details</h2>

            <p>
              <b>Token:</b> {selectedToken.displayToken}
            </p>
            <p>
              <b>Status:</b> {selectedToken.status}
            </p>
            <p>
              <b>Service:</b>{" "}
              {selectedToken.service || selectedToken.serviceName}
            </p>
            <p>
              <b>Generated At:</b>{" "}
              {new Date(
                selectedToken.createdAt || selectedToken.time
              ).toLocaleString()}
            </p>
            <p>
              <strong>Waiting Time:</strong> {getWaitingTime(selectedToken)}
            </p>

            {selectedToken.status !== "pending" && (
  <p>
    <strong>Serving Time:</strong>{" "}
    {getServingTime(selectedToken)}
  </p>
)}

            {selectedToken.completedAt && (
              <p>
                <b>Completion Time:</b>{" "}
                {getDuration(
                  new Date(selectedToken.createdAt || selectedToken.time),
                  new Date(selectedToken.completedAt)
                )}
              </p>
            )}

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

export default TokenHistory;
