import { useNotifications } from "../../context/NotificationContext";

const NotificationsPage = () => {
  const { notifications } = useNotifications();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

      {notifications.length === 0 && <p>No notifications yet.</p>}

      <ul className="space-y-2">
        {notifications.map((n, i) => (
          <li key={i} className="p-4 border rounded-lg shadow-sm">
            <p className="font-medium">{n.serviceName || "Unknown Service"}</p>
            <p>{n.message || "No message"}</p>
            <small className="text-gray-400">
              {n.createdAt
                ? new Date(n.createdAt).toLocaleString()
                : "Unknown date"}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
