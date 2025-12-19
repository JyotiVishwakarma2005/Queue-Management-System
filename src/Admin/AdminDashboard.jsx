const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* Stats Boxes */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">Total Tokens: 15</div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow">Pending: 6</div>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow">Processing: 4</div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow">Completed: 5</div>
      </div>

      {/* Token Distribution + Recent Activity */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="font-bold text-xl mb-4">Token Distribution</h3>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="font-bold text-xl mb-4">Recent Activity</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
