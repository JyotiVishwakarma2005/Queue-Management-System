
// import { useEffect ,useState} from "react";

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//   total: 0,
//   pending: 0,
//   processing: 0,
//   completed: 0,
// });
// useEffect(() => {
//   const fetchStats = async () => {
//     const res = await fetch("http://localhost:5000/api/admin/dashboard-stats");
//     const data = await res.json();
//     setStats(data);
//   };

//   fetchStats();
// }, []);

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Dashboard Overview</h1>

//       {/* Stats Boxes */}
//       <div className="grid grid-cols-4 gap-6">
//         <div className="bg-blue-500 text-white p-6 rounded-lg shadow"><h2>Total Tokens: {stats.total}</h2>
// </div>
//         <div className="bg-yellow-500 text-white p-6 rounded-lg shadow"><h2>Pending: {stats.pending}</h2></div>
//         <div className="bg-purple-500 text-white p-6 rounded-lg shadow">Processing: {stats.processing}</div>
//         <div className="bg-green-500 text-white p-6 rounded-lg shadow">Completed: {stats.completed}</div>
//       </div>

//       {/* Token Distribution + Recent Activity */}
//       <div className="grid grid-cols-2 gap-6">
//         <div className="bg-white p-6 shadow rounded-lg">
//           <h3 className="font-bold text-xl mb-4">Token Distribution</h3>
//         </div>

//         <div className="bg-white p-6 shadow rounded-lg">
//           <h3 className="font-bold text-xl mb-4">Recent Activity</h3>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { motion } from "framer-motion";

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("http://localhost:5000/api/admin/dashboard-stats");
      const data = await res.json();
      setStats(data);
    };

    const fetchActivities = async () => {
      const res = await fetch("http://localhost:5000/api/admin/recent-activity");
      const data = await res.json();
      setActivities(data);
    };

    fetchStats();
    fetchActivities();
  }, []);

  const getPercentage = (value) => {
    if (stats.total === 0) return 0;
    return (value / stats.total) * 100;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* Stats Boxes */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h2>Total Tokens: {stats.total}</h2>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow">
          <h2>Pending: {stats.pending}</h2>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow">
          Processing: {stats.processing}
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          Completed: {stats.completed}
        </div>
      </div>

      {/* Token Distribution + Recent Activity */}
      <div className="grid grid-cols-2 gap-7">
        
        {/* Token Distribution */}
        <div className="bg-white p-6 shadow rounded-lg">
  <h3 className="font-bold text-xl mb-8">Token Distribution</h3>

  <div className="space-y-4">
    {[
      { label: "Completed", value: stats.completed, color: "bg-green-500" },
      { label: "Pending", value: stats.pending, color: "bg-yellow-400" },
      { label: "Processing", value: stats.processing, color: "bg-purple-500" },
    ].map((item, i) => (
      <div key={i}>
        <div className="flex justify-between text-sm mb-4">
          <span>{item.label}</span>
          <span>{item.value}</span>
        </div>

        <div className="h-2 bg-gray-200 rounded overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${stats.total ? (item.value / stats.total) * 100 : 0}%`,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-2 ${item.color}`}
          />
        </div>
      </div>
    ))}
  </div>
</div>

<div className="bg-white p-6 shadow rounded-lg">
  <h3 className="font-bold text-xl mb-4">System Insights</h3>

  <motion.ul
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="space-y-2 text-sm"
  >
    <li className="flex justify-between">
      <span>System Status</span>
      <span className="text-green-600 font-semibold">Healthy</span>
    </li>

    <li className="flex justify-between">
      <span>Completion Rate</span>
      <span className="font-semibold">
        {stats.total
          ? Math.round((stats.completed / stats.total) * 100)
          : 0}
        %
      </span>
    </li>

    <li className="flex justify-between">
      <span>Pending Load</span>
      <span
        className={`font-semibold ${
          stats.pending > 5 ? "text-red-500" : "text-yellow-500"
        }`}
      >
        {stats.pending > 5 ? "High" : "Low"}
      </span>
    </li>

    <li className="flex justify-between">
      <span>Performance</span>
      <span className="text-blue-600 font-semibold">Good</span>
    </li>
  </motion.ul>
</div>


      </div>
    </div>
  );
};

export default Dashboard;

