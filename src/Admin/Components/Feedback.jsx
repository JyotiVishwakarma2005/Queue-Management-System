import { useEffect, useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/feedback")
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Feedback</h1>

      {feedbacks.map(f => (
        <div key={f._id} className="bg-white p-4 rounded shadow mb-3">
          <p className="font-semibold">{f.userId?.name}</p>
          <p>Rating: ⭐ {f.rating}</p>
          <p className="text-gray-700">{f.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Feedback;
