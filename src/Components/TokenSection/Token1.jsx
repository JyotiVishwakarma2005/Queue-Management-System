

import { UserRoundPlus } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from "react";
import TokenCard from "./TokenCard";
import QueueModal from "./QueueModal";

const Token1 = () => {
  const [showQueue, setShowQueue] = useState(false);
  const [queueData, setQueueData] = useState([]);
  const [token, setToken] = useState(null);
  const [show, setShow] = useState(false);

  // 🔹 Load token if user refreshes the page
  useEffect(() => {
    const saved = localStorage.getItem("myToken");
    if (saved) setToken(JSON.parse(saved));
  }, []);

  const handleGenerate = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/token/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: "John Doe", serviceName: "Admission" })
      });

      const data = await res.json();
      setToken(data.token);
      localStorage.setItem("myToken", JSON.stringify(data.token)); // 🔐 Save token
      setShow(true);
      fetchQueue();
    } catch (err) {
      console.error(err);
      alert("Failed to generate token");
    }
  };

  const fetchQueue = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/token/list/Admission");
      const data = await res.json();
      setQueueData(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch queue");
    }
  };

  return (
    <div className='token h-80 w-90 bg-white flex flex-col justify-around p-3 shadow-md shadow-gray-500'>
      
      {/* HEADER */}
      <div className='flex justify-center items-center'>
        <div className='border border-double p-2 rounded-full'>
          <UserRoundPlus />
        </div>
        <h2 className='font-bold text-2xl'>Token for Admission</h2>
      </div>

      {/* INFO */}
      <div className='flex flex-col bg-gray-200 p-3'>
        <p>Expected waiting time:</p>
        <p>Current queue:</p>
      </div>

      {/* BUTTONS */}
      <div className='flex justify-between'>

        {/* 🔥 Show Generate Token ONLY if no token exists */}
        {!token && (
          <button 
            className='p-3 bg-black text-white rounded-2xl hover:bg-white hover:text-black hover:border hover:font-bold'
            onClick={handleGenerate}
          >
            Generate Token
          </button>
        )}

        {/* 🎫 Show See My Token if token already exists */}
        {token && (
          <button 
            className='p-3 bg-black text-white rounded-2xl hover:bg-white hover:text-black hover:border hover:font-bold'
            onClick={() => setShow(true)}
          >
            See My Token
          </button>
        )}

        <button 
          className='p-3 bg-black text-white rounded-2xl flex items-center hover:bg-white hover:text-black hover:border hover:font-bold'
          onClick={() => {
            fetchQueue();
            setShowQueue(true);
          }}
        >
          View Queue <ArrowRight />
        </button>
      </div>

      {/* TOKEN MODAL */}
      {show && token && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <TokenCard
            token={token}
            service="Admission"
            closeModal={() => setShow(false)}
          />
        </div>
      )}

      {/* QUEUE MODAL */}
      <QueueModal
        show={showQueue}
        onClose={() => setShowQueue(false)}
        serviceName="Admission"
        queue={queueData}
      />
    </div>
  );
};

export default Token1;
