import { ArrowRight } from 'lucide-react';
import { BookOpenText } from 'lucide-react';
import { useContext, useState } from "react";
import { QueueContext } from "./QueueContext";
import TokenCard from "./TokenCard";
const Token3 = () => {
   const { generateToken } = useContext(QueueContext);
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);

  const handleGenerate = () => {
    const newToken = generateToken("Library"); // 👈 just change name
    setToken(newToken);
    setShow(true);
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
        <button className='p-3 bg-black text-white rounded-2xl flex items-center hover:bg-white hover:text-black hover:border hover:font-bold'>View Queue <ArrowRight /></button>
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
    </div>
  )
}

export default Token3
