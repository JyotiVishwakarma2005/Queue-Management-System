import React, { useState ,useEffect} from "react";

const statusStyles = {
  pending: "bg-yellow-200 text-yellow-800",
  processing: "bg-blue-200 text-blue-800",
  completed: "bg-green-200 text-green-800",
  cancelled: "bg-red-200 text-red-800",
};
const CanteenTokens = () => {
  const [tokens, setTokens] = useState([]);

  // Fetch Admission Tokens (Correct API)
  const fetchTokens = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/tokens/list/Canteen"
      );
      const data = await res.json();
      setTokens(data);
    } catch (err) {
      console.log("Error fetching tokens", err);
    }
  };
useEffect(() => {
  fetchTokens();
}, []);
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Canteen Tokens</h1>

        <button
          onClick={fetchTokens}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>

      <p className="mb-4 text-gray-700">
        Total Tokens: <b>{tokens.length}</b>
      </p>

      {/* Token List */}
      <div className="space-y-4">
        {tokens.map((token) => (
          <div
            key={token._id}
            className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
          >
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
                    statusStyles[token.status?.toLowerCase()]|| ""
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

            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                View
              </button>

              {token.status === "pending" && (
                <>
                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    Process
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Reject
                  </button>
                </>
              )}

              {token.status === "processing" && (
                <button className="bg-green-500 text-white px-3 py-1 rounded">
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanteenTokens;
