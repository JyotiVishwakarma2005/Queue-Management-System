import { useState } from "react";
import axios from "axios";

const TokenForm = ({ onTokenGenerated }) => {
  const [userName, setUserName] = useState("");
  const [serviceName, setServiceName] = useState("");

  const generateToken = async () => {
    if (!userName || !serviceName) return alert("Fill all fields");

    const res = await axios.post("http://localhost:5000/api/token/generate", {
      userName,
      serviceName
    });

    onTokenGenerated(res.data.token);
    alert(`Token Generated: ${res.data.token.tokenNumber}`);
  };

  return (
    <div className="p-4 bg-white shadow rounded w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Generate Token</h2>

      <input 
        type="text"
        placeholder="Enter your name"
        className="w-full border p-2 rounded mb-3"
        onChange={(e) => setUserName(e.target.value)}
      />

      <select 
        className="w-full border p-2 rounded mb-3"
        onChange={(e) => setServiceName(e.target.value)}
      >
        <option>Select service</option>
        <option value="Admission">Admission</option>
        <option value="Canteen">Canteen</option>
        <option value="Library">Library</option>
        <option value="Railway Concession">Railway Concession</option>
      </select>

      <button 
        onClick={generateToken}
        className="bg-blue-600 text-white w-full p-2 rounded"
      >
        Generate Token
      </button>
    </div>
  );
};

export default TokenForm;
