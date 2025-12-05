import { ArrowRight } from 'lucide-react';
import { BookOpenText } from 'lucide-react';
import { useContext, useState } from "react";
import TokenCard from "./TokenCard";
import QueueModal from "./QueueModal";
const Token3 = () => {
    const [showQueue, setShowQueue] = useState(false);
  const [queueData, setQueueData] = useState([]);
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);

   const handleGenerate = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/token/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: "John Doe", serviceName: "Library" }) // replace with dynamic userName if needed
    });

    const data = await res.json();
    setToken(data.token); // store the generated token
    setShow(true);

    // Optional: refresh queue after generating
    fetchQueue();
  } catch (err) {
    console.error(err);
    alert("Failed to generate token");
  }
}

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
        <p>Expected waiting time:</p>
        <p>Current queue:</p>
      </div>
      <div className='flex justify-between '>
        <button className='p-3 bg-black text-white rounded-2xl hover:bg-white hover:text-black hover:border hover:font-bold' onClick={handleGenerate}>Generate Token</button>
        <button className='p-3 bg-black text-white rounded-2xl flex items-center hover:bg-white hover:text-black hover:border hover:font-bold' onClick={() => setShowQueue(true)}>View Queue <ArrowRight /></button>
      </div>
    </div>
     {show && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <TokenCard 
      token={token} 
      service="Library"
      closeModal={() => setShow(false)}
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
