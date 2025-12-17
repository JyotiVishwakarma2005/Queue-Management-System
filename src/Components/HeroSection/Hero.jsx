
// import { UsersRound } from "lucide-react";
// import { CircleCheckBig } from "lucide-react";
// import { Clock } from "lucide-react";
// import heroImg from "../../assets/Images/heroImg.png"
// const Hero = () => {
//   return (
//     <div className="h-125 w-full bg-amber-200  relative">
//       <img
//         src={heroImg}
//         alt=""
//         className="w-full h-125"
//       />
//       <div className="absolute backdrop-blur-sm bg-white/10  w-[90%] flex flex-wrap justify-center items-center  gap-7  left-0 top-20  h-100 ml-[5%]">
//       <div className=" flex flex-col items-center">
//         <h1 className="text-5xl text-[#341C4E] font-bold">Smart Queue Management</h1>
//         <h3 className="text-2xl text-[#ffffff] font-bold">Skip the long lines. Generate your token online and get notified when it's your turn.</h3>
//       </div>
//         <div className="flex  w-full justify-center gap-10 ">
//           <div className="h-40 w-1/4 bg-white rounded-3xl flex justify-center items-center ">
//             <UsersRound size={60} />
//             <div>
//               <h1 className="text-xl font-bold">3,263</h1>
//               <p>Students Served Today</p>
//             </div>
//           </div>
//           <div className="h-40 w-1/4 bg-white rounded-3xl  flex justify-center items-center">
//             <CircleCheckBig size={60} />
//             <div>
//               <h1 className="text-xl font-bold">2,337</h1>
//               <p>Tokens Completed</p>
//             </div>
//           </div>
//           <div className="h-40 w-1/4 bg-white rounded-3xl  flex justify-center items-center">
//             <Clock size={60} />
//             <div>
//               <h1 className="text-xl font-bold">4 min</h1>
//               <p>Average wait time</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;


import { UsersRound, CircleCheckBig, Clock } from "lucide-react";
import heroImg from "../../assets/Images/heroImg.png";

const Hero = () => {
  return (
    <div className="w-full relative">
      {/* HERO IMAGE */}
      <img
        src={heroImg}
        alt="Hero"
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
      />

      {/* CONTENT OVERLAY */}
      <div className="absolute inset-0 flex flex-col items-center mt-10 px-4">
        {/* Text Content */}
        <div className="backdrop-blur-sm bg-white/10 w-full md:w-[90%] p-6 md:p-10 rounded-xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#341C4E] font-bold">
            Smart Queue Management
          </h1>
          <h3 className="text-lg sm:text-xl md:text-2xl text-white font-semibold mt-3">
            Skip the long lines. Generate your token online and get notified when it's your turn.
          </h3>

          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {/* Card 1 */}
            <div className="bg-white h-36 sm:h-40 rounded-3xl flex items-center gap-4 p-5 shadow-md">
              <UsersRound size={50} className="text-[#341C4E]" />
              <div>
                <h1 className="text-xl font-bold">3,263</h1>
                <p className="text-sm">Students Served Today</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white h-36 sm:h-40 rounded-3xl flex items-center gap-4 p-5 shadow-md">
              <CircleCheckBig size={50} className="text-[#341C4E]" />
              <div>
                <h1 className="text-xl font-bold">2,337</h1>
                <p className="text-sm">Tokens Completed</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white h-36 sm:h-40 rounded-3xl flex items-center gap-4 p-5 shadow-md">
              <Clock size={50} className="text-[#341C4E]" />
              <div>
                <h1 className="text-xl font-bold">4 min</h1>
                <p className="text-sm">Average Wait Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

