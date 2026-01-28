import { useEffect, useState } from "react";

const CompletedTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [collapsedServices, setCollapsedServices] = useState({});

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch completed tokens
  useEffect(() => {
    fetch("http://localhost:5000/api/tokens/completed")
      .then((res) => res.json())
      .then((data) => setTokens(data))
      .catch((err) => console.error(err));
  }, []);

  // Group tokens by service
  const groupByService = (tokens) => {
    return tokens.reduce((acc, token) => {
      if (!acc[token.serviceName]) acc[token.serviceName] = [];
      acc[token.serviceName].push(token);
      return acc;
    }, {});
  };

  const groupedTokens = groupByService(tokens);

  // Duration calculation
  const getDuration = (start, end) => {
    if (!start || !end || isNaN(start) || isNaN(end)) return "0m 0s";
    const diff = Math.max(0, Math.floor((end - start) / 1000));
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}m ${seconds}s`;
  };

  // Queue position at entry
  const getQueuePositionAtEntry = (token) => {
    if (!token || !tokens.length) return "--";
    const tokenTime = new Date(token.time);
    return tokens.filter(
      (t) =>
        t.serviceName === token.serviceName &&
        new Date(t.time) <= tokenTime
    ).length;
  };

  const handleView = (token) => {
    setSelectedToken(token);
    setShowViewModal(true);
  };

  const toggleCollapse = (service) => {
    setCollapsedServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Completed Tokens</h1>
        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
          {tokens.length} Completed
        </span>
      </div>

      {/* EMPTY STATE */}
      {tokens.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No completed tokens found
        </div>
      ) : (
        Object.keys(groupedTokens).map((service) => (
          <div key={service} className="mb-6">
            {/* Section Header */}
            <div
              className="flex justify-between items-center cursor-pointer bg-gray-100 px-4 py-2 rounded"
              onClick={() => toggleCollapse(service)}
            >
              <h2 className="text-xl  text-white font-bold bg-[#341C4E] p-1 hover:text-amber-300 w-full flex items-center justify-center">{service}</h2>
              <span>{collapsedServices[service] ? "+" : "-"}</span>
            </div>

            {/* Tokens Grid */}
            {!collapsedServices[service] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {groupedTokens[service].map((token) => (
                  <div
                    key={token._id}
                    className="bg-white rounded-xl shadow p-4 flex justify-between items-start"
                  >
                    {/* LEFT */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
                          {token.displayToken}
                        </span>
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {token.serviceName}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-800">{token.userName}</p>
                      <p className="text-sm text-gray-500">
                        Completed on {new Date(token.time).toLocaleDateString()} at{" "}
                        {new Date(token.time).toLocaleTimeString()}
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col gap-1 items-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Completed
                      </span>
                      <button
                        onClick={() => handleView(token)}
                        className="bg-blue-500 text-white w-15 py-1 rounded"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {/* MODAL */}
      {showViewModal && selectedToken && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Token Details</h2>

            <p><b>Token:</b> {selectedToken.displayToken}</p>
            <p><b>User:</b> {selectedToken.userName}</p>
            <p><b>Service:</b> {selectedToken.serviceName}</p>
            <p><b>Status:</b> {selectedToken.status}</p>
            <p>
              <b>Time:</b> {new Date(selectedToken.time).toLocaleString()}
            </p>

            {/* METRICS */}
            <div className="grid grid-cols-3 gap-4 mt-4">
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

export default CompletedTokens;
