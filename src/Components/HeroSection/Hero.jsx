
import { UsersRound } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { Clock } from "lucide-react";
const Hero = () => {
  return (
    <div className="h-125 w-full bg-amber-200  relative">
      <img
        src="https://spndoshicollege.com/img/slider/slider01.jpg"
        alt=""
        className="w-full h-125"
      />
      <div className="absolute backdrop-blur-sm bg-white/10  w-[90%] flex flex-wrap justify-center items-center  gap-7  left-0 top-20  h-100 ml-[5%]">
      <div className=" flex flex-col items-center">
        <h1 className="text-5xl text-[#341C4E] font-bold">Smart Queue Management</h1>
        <h3 className="text-2xl text-[#ffffff] font-bold">Skip the long lines. Generate your token online and get notified when it's your turn.</h3>
      </div>
        <div className="flex  w-full justify-center gap-10 ">
          <div className="h-40 w-1/4 bg-white rounded-3xl flex justify-center items-center ">
            <UsersRound size={60} />
            <div>
              <h1 className="text-xl font-bold">3,263</h1>
              <p>Students Served Today</p>
            </div>
          </div>
          <div className="h-40 w-1/4 bg-white rounded-3xl  flex justify-center items-center">
            <CircleCheckBig size={60} />
            <div>
              <h1 className="text-xl font-bold">2,337</h1>
              <p>Tokens Completed</p>
            </div>
          </div>
          <div className="h-40 w-1/4 bg-white rounded-3xl  flex justify-center items-center">
            <Clock size={60} />
            <div>
              <h1 className="text-xl font-bold">4 min</h1>
              <p>Average wait time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
