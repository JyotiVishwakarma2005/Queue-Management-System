const TokenCard = ({ id, name, roll, course, date, time, status }) => {
  return (
    <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
      
      {/* Left Side */}
      <div>
        <h3 className="text-purple-700 text-lg font-bold">{id}</h3>
        <p className="font-semibold">{name}</p>
        <p className="text-sm">🎓 {course}</p>
        <p className="text-sm">🧾 Roll: {roll}</p>
        <p className="text-sm">📅 {date} | {time}</p>
      </div>

      {/* Right Buttons */}
      <div className="flex flex-col gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">View</button>
        {status !== "Processing" && (
          <button className="bg-green-500 text-white px-4 py-2 rounded">Process</button>
        )}
        <button className="bg-red-500 text-white px-4 py-2 rounded">Reject</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Complete</button>
      </div>
    </div>
  );
};

export default TokenCard;
