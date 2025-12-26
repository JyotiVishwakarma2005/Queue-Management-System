import { useEffect, useState } from "react";

const CompletedTokens = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tokens/completed")
      .then((res) => res.json())
      .then((data) => setTokens(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Completed Tokens
        </h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tokens.map((token) => (
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

                <p className="font-semibold text-gray-800">
                  {token.userName}
                </p>

                <p className="text-sm text-gray-500">
                  Completed on{" "}
                  {new Date(token.time).toLocaleDateString()}{" "}
                  at{" "}
                  {new Date(token.time).toLocaleTimeString()}
                </p>
              </div>

              {/* RIGHT */}
              <div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTokens;
