import { ArrowRight } from 'lucide-react';
import { BookOpenText } from 'lucide-react';
import { useEffect, useState } from "react";
import TokenCard from "./TokenCard";
import QueueModal from "./QueueModal";

const serviceName = "Library";
const Token3 = () => {
    const [showQueue, setShowQueue] = useState(false);
  const [queueData, setQueueData] = useState([]);
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);

useEffect(() => {
  const interval = setInterval(() => {
    fetchQueue();
  }, 5000); // fetch every 5 seconds

  return () => clearInterval(interval);
}, []);

const SERVICE_NAME = "Library";
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
      `http://localhost:5000/api/token/cancel/${token.serviceName}/${token.tokenNumber}`,
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
        t.tokenNumber === token.tokenNumber ? { ...t, status: 'Canceled' } : t
      )
    );

  } catch (err) {
    console.error(err);
    alert('Failed to cancel token');
  }
};

 useEffect(() => {
  const saved = localStorage.getItem("LibraryToken");
  if (saved) setToken(JSON.parse(saved));
}, []);

   const handleGenerate = async () => {
     const userName = localStorage.getItem("queueUserName"); // ✅ just get the string
  if (!userName) return alert("No user logged in");
    try {
      const res = await fetch("http://localhost:5000/api/token/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, serviceName: "Library" })
      });

      const data = await res.json();
      setToken(data.token);
      localStorage.setItem(`${serviceName}Token`, JSON.stringify(data.token)); // 🔐 Save token
      setShow(true);
      fetchQueue();
    } catch (err) {
      console.error(err);
      alert("Failed to generate token");
    }
  };

const fetchQueue = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/token/list/library");
    const data = await res.json();
    setQueueData(data);
  } catch (err) {
    console.error(err);
    alert("Failed to fetch queue");
  }
};
  return (
    <div>
       <div className=' token h-80 w-90 bg-white flex flex-col justify-around p-3 shadow-md shadow-gray-500 '>
      <div className='flex justify-center items-center  '>
        <div className='border border-double p-2 rounded-full'>
        <BookOpenText />
        </div>
        <h2 className='font-bold text-2xl'>Token for Library </h2>
      </div>
      <div className='flex flex-col bg-gray-200 p-3'>
        <p>Expected waiting time:{expectedTime}</p>
        <p>Current queue:{currentQueue}</p>
      </div>
      <div className='flex justify-between '>
       {!token && (
          <button 
            className='p-3 bg-black text-white rounded-2xl hover:bg-white hover:text-black hover:border hover:font-bold'
            onClick={handleGenerate}
          >
            Generate Token
          </button>
        )}
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
    </div>
     {show && token &&(
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <TokenCard 
      token={token} 
      service="Library"
      closeModal={() => setShow(false)}
       cancelToken={handleCancelToken}
    />
  </div>
)}
<QueueModal
  show={showQueue}
  onClose={() => setShowQueue(false)}
  serviceName="Library"
  queue={queueData}
/>
    </div>
  )
}

export default Token3
