

import { useContext } from "react";
import { SocketContext } from "../../socketProvider";


const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead } = useContext(SocketContext);


  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold mb-3">Notifications</h2>
<button
  onClick={markAllAsRead}
  className="mb-4 px-3 py-1 bg-black text-white rounded"
>
  Mark all as read
</button>
</div>
      {notifications.length === 0 && <p>No notifications yet.</p>}

      <ul className="space-y-2">
      {notifications.map((n) => (
  <li
  key={n.id}
  className={`p-4 border rounded-lg shadow-sm transition ${
    n.read
      ? "bg-gray-100"
      : "bg-white border-l-4 border-blue-500"
  }`}
>
<div className="flex justify-between items-center mb-2">
  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
    {n.service}
  </span>

  <small className="text-gray-400">
    {new Date(n.createdAt).toLocaleString()}
  </small>
</div>

<p className="text-sm text-gray-800 mb-3">
  {n.message}
</p>

{!n.read && (
  <div className="text-right">
    <button
      onClick={() => markAsRead(n.id)}
      className="text-xs px-3 py-1 rounded-full bg-blue-950 text-amber-50 hover:opacity-90"
    >
      Mark as read
    </button>
  </div>
)}

</li>

))}
</ul>
    </div>
  );
};

export default NotificationsPage;

