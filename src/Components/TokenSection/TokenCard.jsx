import { X } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';

const TokenCard = (props) => {
    console.log(props.name)
  return (
    <div className="bg-amber-500 h-100 w-1/4 p-4">
    <div className='flex justify-end'>
         <X />
         </div>
         <div className='flex justify-center items-center'>
            <h1 className='text-2xl'>Your Token</h1>
         </div>
         <div className='flex justify-center flex-col items-center'>
            <CircleCheckBig size={40} color='green'/>
            <p></p>

         </div>
    </div>
  )
}

export default TokenCard
