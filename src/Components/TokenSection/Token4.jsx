import { UtensilsCrossed } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
const Token4 = () => {
  return (
    <div>
      <div className=' token h-80 w-90 bg-white flex flex-col justify-around p-3 shadow-md shadow-gray-500 '>
      <div className='flex justify-center items-center  '>
        <div className='border border-double p-2 rounded-full'>
        <UtensilsCrossed />
        </div>
        <h2 className='font-bold text-2xl'>Token for Canteen </h2>
      </div>
      <div className='flex flex-col bg-gray-200 p-3'>
        <p>Expected waiting time:</p>
        <p>Current queue:</p>
      </div>
      <div className='flex justify-between '>
        <button className='p-3 bg-black text-white rounded-2xl hover:bg-white hover:text-black hover:border hover:font-bold'>Generate Token</button>
        <button className='p-3 bg-black text-white rounded-2xl flex items-center hover:bg-white hover:text-black hover:border hover:font-bold'>View Queue <ArrowRight /></button>
      </div>
    </div>
    </div>
  )
}

export default Token4
