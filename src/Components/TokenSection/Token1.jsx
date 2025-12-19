

import { UserRoundPlus } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from "react";
import TokenCard from "./TokenCard";
import QueueModal from "./QueueModal";

const serviceName = "Admission";

const Token1 = ({ queueData:initialQueueData=[]}) => {
  const [showQueue, setShowQueue] = useState(false);
  const [queueData, setQueueData] = useState([]);
  const [token, setToken] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
  const interval = setInterval(() => {
    fetchQueue();
  }, 5000); // fetch every 5 seconds

  return () => clearInterval(interval);
}, []);

const SERVICE_NAME = "Admission";
  const SERVICE_TIME = {
    Admission: 25,
    railwayConsession: 10,
    Library: 3,
    Canteen: 2,
    FeesPayment: 7,
  };

  const avgTime = SERVICE_TIME[SERVICE_NAME] || 3;

const serviceQueue = queueData.filter(
  (item) => item.serviceName === SERVICE_NAME && item.status.toLowerCase() === "pending"
);

const currentQueue = serviceQueue.length;
const expectedTime = currentQueue * avgTime;


const handleCancelToken = async () => {
  try {
    await fetch(
      `http://localhost:5000/api/tokens/cancel/${token.serviceName}/${token.tokenNumber}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    // Remove token locally
    localStorage.removeItem(`${token.serviceName}Token`);
    setToken(null);
    setShow(false);

    // Optionally update queueData locally
    setQueueData(prev =>
      prev.map(t =>
        t.tokenNumber === token.tokenNumber ? { ...t, status: 'Cancelled' } : t
      )
    );

  } catch (err) {
    console.error(err);
    alert('Failed to cancel token');
  }
};


  // 🔹 Load token if user refreshes the page
  useEffect(() => {
    const saved = localStorage.getItem("AdmissionToken");
    if (saved) setToken(JSON.parse(saved));
  }, []);

  const [user, setUser] = useState(null);

useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);

  const handleGenerate = async () => {
  const userName = localStorage.getItem("queueUserName");
  if (!userName) return alert("No user logged in");

  try {
    const res = await fetch("http://localhost:5000/api/tokens/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, serviceName: "Admission" })
    });

    const data = await res.json();

    setToken(data.token);
    localStorage.setItem(`${serviceName}Token`, JSON.stringify(data.token));
    setShow(true);

    // ❌ REMOVE THIS
    // fetchQueue();

  } catch (err) {
    console.error(err);
    alert("Failed to generate token");
  }
};


  const fetchQueue = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tokens/list/Admission");
      const data = await res.json();
      setQueueData(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch queue");
    }
  };

  return (
    <div className=' token h-80 w-90 bg-white flex flex-col justify-around p-3 shadow-md shadow-gray-500 '>

  {/* HEADER */}
  <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-3">
    <div className="border border-double p-3 rounded-full">
      <UserRoundPlus />
    </div>
    <h2 className="font-bold text-xl sm:text-2xl">Token for Admission</h2>
  </div>

  {/* INFO */}
  <div className="flex flex-col bg-gray-200 p-4 rounded-lg text-sm sm:text-base">
    <p>Expected waiting time: {expectedTime}</p>
    <p>Current queue: {currentQueue}</p>
  </div>

  {/* BUTTONS */}
  <div className="flex flex-col sm:flex-row gap-3 justify-between">

    {/* Generate Token button */}
    {!token && (
      <button 
        className="p-3 bg-black text-white rounded-2xl hover:bg-white hover:text-black hover:border hover:font-bold w-full sm:w-auto"
        onClick={handleGenerate}
      >
        Generate Token
      </button>
    )}

    {/* See My Token button */}
    {token && (
      <button 
        className="p-3 bg-black text-white rounded-2xl hover:bg-white hover:text-black hover:border hover:font-bold w-full sm:w-auto"
        onClick={() => setShow(true)}
      >
        See My Token
      </button>
    )}

    {/* View Queue */}
    <button 
      className="p-3 bg-black text-white rounded-2xl flex justify-center items-center gap-2 hover:bg-white hover:text-black hover:border hover:font-bold w-full sm:w-auto"
      onClick={() => {
        fetchQueue();
        setShowQueue(true);
      }}
    >
      View Queue <ArrowRight />
    </button>
  </div>

  {/* TOKEN MODAL (unchanged) */}
  {show && token && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <TokenCard
        token={token}
        service="Admission"
        closeModal={() => setShow(false)}
        cancelToken={handleCancelToken}
      />
    </div>
  )}

  {/* QUEUE MODAL (unchanged) */}
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
