import { useEffect, useState } from "react";
import axios from "axios";

const QueueList = () => {
  const [queue, setQueue] = useState([]);

  const fetchQueue = async () => {
    const res = await axios.get("http://localhost:5000/api/token/list");
    setQueue(res.data);
  };

  useEffect(() => {
    fetchQueue();
    const refresh = setInterval(fetchQueue, 3000);
    return () => clearInterval(refresh);
  }, []);

  return (
    <div className="mt-6 bg-white p-4 shadow rounded max-w-lg w-full">
      <h2 className="text-xl font-bold mb-3">Current Queue</h2>
      {queue.map((t) => (
        <div key={t._id} className="p-2 border-b flex justify-between">
          <span>Token #{t.tokenNumber}</span>
          <span>{t.serviceName}</span>
          <span>{t.userName}</span>
        </div>
      ))}
    </div>
  );
};

export default QueueList;
