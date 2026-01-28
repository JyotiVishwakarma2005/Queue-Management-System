import { useEffect, useState } from "react";
import axios from "axios";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/complaints")
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error(err));
  }, []);

  const resolveComplaint = async (id) => {
  try {
    await axios.patch(`http://localhost:5000/api/complaints/resolve/${id}`);
    setComplaints((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status: "resolved" } : c))
    );
  } catch (error) {
    console.error("Resolve error:", error);
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Complaints</h1>

      {complaints.length === 0 ? (
        <p>No complaints found</p>
      ) : (
        complaints.map((c) => (
          <div key={c._id} className="bg-white p-4 rounded shadow mb-3">
            <p className="font-semibold">
              User: {c.userName}
            </p>
            <p className="text-gray-700">
              Complaint: {c.complaintText}
            </p>
            <p className="text-sm text-gray-500">
              Service: {c.serviceName}
            </p>
            <p className="text-sm text-gray-500">
              Status: {c.status}
            </p>

            {c.status === "pending" && (
              <button
                onClick={() => resolveComplaint(c._id)}
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
              >
                Resolve
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Complaints;

