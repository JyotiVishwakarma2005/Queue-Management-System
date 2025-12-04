import { X } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';
import html2canvas from "html2canvas";
import { useRef } from "react";
const TokenCard = (props) => {
  const downloadRef = useRef(null); 

  const downloadAsImage = async () => {
    if (!downloadRef.current) return;

    const canvas = await html2canvas(downloadRef.current, { backgroundColor: null, scale: 2 });
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = `Token-${props.token}.png`; 
    link.click();
  };
  return (
    <div className="bg-[#FEE6A4] w-[300px] sm:w-[350px] md:w-[400px] rounded-2xl p-5 shadow-2xl flex flex-col items-center relative" ref={downloadRef} >

      {/* Close Button */}
      <button 
        className="absolute top-3 right-3 hover:scale-110"
        onClick={props.closeModal}   // 👈 use the close function from props
      >
        <X />
      </button>

      <h1 className="text-2xl font-bold mb-4">Your Token</h1>

      <CircleCheckBig size={50} color="green" />

      <p className="mt-4 text-lg font-semibold">{props.service}</p>
      <h1 className="text-3xl font-extrabold">{props.token}</h1>

      <p className="text-center my-4 text-sm">
        Please keep this token number safe. You will be called when it’s your turn.
      </p>

      <div className="flex justify-between gap-4 w-full mt-3">
        <button 
          onClick={props.closeModal}
          className="flex-1 p-2 bg-[#341C4E] text-white rounded-lg hover:bg-white hover:text-black hover:border hover:font-bold"
        >
          Cancel Token
        </button>
        <button className="flex-1 p-2 bg-[#341C4E] text-white rounded-lg hover:bg-white hover:text-black hover:border hover:font-bold" onClick={downloadAsImage}>
         Download Token
        </button>
      </div>
    </div>
  );
};

export default TokenCard;