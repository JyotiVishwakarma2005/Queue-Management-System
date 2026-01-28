import { useState,useEffect } from "react";

import axios from "axios"; 

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [complaintText, setComplaintText] = useState("");
  const [serviceName, setServiceName] = useState("");

  // Simulate logged-in user
  const user = { _id: "64f2e2b8c2f5a9a1a1234567", name: "Jyoti Vishwakarma" };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitComplaint = async () => {
    if (!serviceName || !complaintText) return alert("Fill all fields");

    try {
      const res = await axios.post("http://localhost:5000/api/complaints", {
        userId: user._id,
        userName: user.name,
        serviceName,
        complaintText,
      });
      console.log("Complaint submitted:", res.data);

      // Add to local state
      setComplaints([res.data.complaint, ...complaints]);

      // Reset form
      setComplaintText("");
      setServiceName("");
    } catch (err) {
      console.error(err);
    }
  };

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

      {/* Complaint form */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <input
          type="text"
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Your complaint"
          value={complaintText}
          onChange={(e) => setComplaintText(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        ></textarea>
        <button
          onClick={submitComplaint}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Complaint
        </button>
      </div>

        
    </div>
  );
};

export default Complaints;
