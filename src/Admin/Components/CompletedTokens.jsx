import React from "react";

const tokens = [
  {
    id: "ADM001",
    status: "Pending",
    name: "Rahul Sharma",
    roll: "2024001",
    course: "B.Tech CSE",
    date: "2024-01-15",
    time: "10:30 AM",
  },
  {
    id: "ADM002",
    status: "Processing",
    name: "Priya Patel",
    roll: "2024002",
    course: "B.Tech ECE",
    date: "2024-01-15",
    time: "11:00 AM",
  },
  {
    id: "ADM003",
    status: "Completed",
    name: "Amit Kumar",
    roll: "2024003",
    course: "B.Tech ME",
    date: "2024-01-15",
    time: "11:30 AM",
  },
];

const statusStyles = {
  Pending: "bg-yellow-200 text-yellow-800",
  Processing: "bg-blue-200 text-blue-800",
  Completed: "bg-green-200 text-green-800",
};

const CompletedTokens = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Completed Tokens</h1>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
          {tokens.length} Tokens
        </span>
      </div>

      <div className="space-y-4">
        {tokens.map((token) => (
          <div
            key={token.id}
            className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`font-bold ${statusStyles[token.status] || ""} px-2 py-1 rounded-full`}>
                  {token.id}
                </span>
                <span className={`text-sm ${statusStyles[token.status] || ""} px-2 py-1 rounded-full`}>
                  {token.status}
                </span>
              </div>
              <p className="font-semibold">{token.name}</p>
              <p className="text-sm text-gray-600">Roll No: {token.roll}</p>
              <p className="text-sm text-gray-600">Course: {token.course}</p>
              <p className="text-sm text-gray-600">
                {token.date} | {token.time}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
              {token.status === "Pending" && (
                <>
                  <button className="bg-green-500 text-white px-3 py-1 rounded">Process</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                </>
              )}
              {token.status === "Processing" && (
                <button className="bg-green-500 text-white px-3 py-1 rounded">Complete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedTokens;
