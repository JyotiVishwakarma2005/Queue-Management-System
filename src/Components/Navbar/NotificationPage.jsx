

import { useContext } from "react";
import { SocketContext } from "../../socketProvider";


const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead } = useContext(SocketContext);


  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
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
    className={`p-4 border rounded-lg shadow-sm ${
      n.read ? "bg-gray-100" : "bg-white border-l-4 border-blue-500"
    }`}
  >
    <p className="font-medium">{n.serviceName}</p>
    <p>{n.message}</p>

    <div className="flex justify-between items-center">
      <small className="text-gray-400">
        {new Date(n.createdAt).toLocaleString()}
      </small>

      {!n.read && (
        <button
          onClick={() => markAsRead(n.id)}
          className="text-sm p-2 rounded-2xl hover:underline bg-blue-950 text-amber-50"
        >
          Mark as read
        </button>
      )}
    </div>
  </li>
))}
</ul>
    </div>
  );
};

export default NotificationsPage;

