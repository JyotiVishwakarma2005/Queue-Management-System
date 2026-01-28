// import { UsersRound, CircleCheckBig, Clock } from "lucide-react";
// import heroImg from "../../assets/Images/heroImg.png";
// import { motion } from "framer-motion";

// const Hero = () => {
//   // Stagger variants for cards
//   const cardsContainer = {
//     hidden: {},
//     show: {
//       transition: {
//         staggerChildren: 0.2, // each card appears 0.2s after the previous
//       },
//     },
//   };

//   const cardVariant = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   return (
//     <div className="w-full relative">
//       {/* HERO IMAGE */}
//       <img
//         src={heroImg}
//         alt="Hero"
//         className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
//       />

//       {/* CONTENT OVERLAY */}
//       <div className="absolute inset-0 flex flex-col items-center mt-10 px-4">
//         {/* Text Content */}
//         <div className="backdrop-blur-sm bg-white/10 w-full md:w-[90%] p-6 md:p-10 rounded-xl text-center">
          
//           {/* Animated Headings */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="text-3xl sm:text-4xl md:text-5xl text-[#341C4E] font-bold"
//           >
//             Smart Queue Management
//           </motion.h1>

//           <motion.h3
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.5 }}
//             className="text-lg sm:text-xl md:text-2xl text-white font-semibold mt-3"
//           >
//             Skip the long lines. Generate your token online and get notified when it's your turn.
//           </motion.h3>

//           {/* Stats Cards */}
//           <motion.div
//             className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center"
//             variants={cardsContainer}
//             initial="hidden"
//             animate="show"
//           >
//             {/* Card 1 */}
//             <motion.div
//               variants={cardVariant}
//               className="bg-white h-36 sm:h-40 rounded-3xl flex items-center justify-center gap-4 p-5 shadow-md"
//             >
//               <UsersRound size={50} className="text-[#341C4E]" />
//               <div>
//                 <h1 className="lg:text-2xl font-bold sm:text-sm">3,263</h1>
//                 <p className="lg:text-lg sm:text-sm">Students Served Today</p>
//               </div>
//             </motion.div>

//             {/* Card 2 */}
//             <motion.div
//               variants={cardVariant}
//               className="bg-white h-36 sm:h-40 rounded-3xl flex items-center justify-center gap-4 p-5 shadow-md"
//             >
//               <CircleCheckBig size={50} className="text-[#341C4E]" />
//               <div>
//                 <h1 className="lg:text-2xl font-bold sm:text-sm">2,337</h1>
//                 <p className="lg:text-lg sm:text-sm">Tokens Completed</p>
//               </div>
//             </motion.div>

//             {/* Card 3 */}
//             <motion.div
//               variants={cardVariant}
//               className="bg-white h-36 sm:h-40 rounded-3xl flex items-center justify-center gap-4 p-5 shadow-md"
//             >
//               <Clock size={50} className="text-[#341C4E]" />
//               <div>
//                 <h1 className="lg:text-2xl font-bold sm:text-sm">4 min</h1>
//                 <p className="lg:text-lg sm:text-sm">Average Wait Time</p>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;


import { UsersRound, CircleCheckBig, Clock } from "lucide-react";
import heroImg from "../../assets/Images/heroImg.png";
import { motion } from "framer-motion";

const Hero = () => {
  // Stagger variants for cards
  const cardsContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

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
        <div className="backdrop-blur-sm bg-white/10 w-full md:w-[90%] p-6 md:p-10 rounded-xl text-center">

          {/* 🔔 MOVING TIMING BAR (RIGHT TO LEFT) */}
          <div className="w-full overflow-hidden mb-4">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "-100%" }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
              className="inline-flex items-center gap-6 bg-[#341C4E] text-white py-2 px-10 rounded-xl text-sm sm:text-base font-semibold whitespace-nowrap"
            >
              🎓 Admission Token: 10:00 AM – 5:00 PM |
              🍽️ Canteen: 9:00 AM – 4:00 PM |
              🚆 Railway Concession: 10:00 AM – 1:00 PM |
              📚 Library: 10:00 AM – 4:00 PM |
              💰 Fees Payment: 10:00 AM – 1:00 PM
            </motion.div>
          </div>

          {/* Animated Headings */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl text-[#341C4E] font-bold"
          >
            Smart Queue Management
          </motion.h1>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl text-white font-semibold mt-3"
          >
            Skip the long lines. Generate your token online and get notified when it's your turn.
          </motion.h3>

          {/* Stats Cards */}
          <motion.div
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center"
            variants={cardsContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={cardVariant}
              className="bg-white h-36 sm:h-40 rounded-3xl flex items-center justify-center gap-4 p-5 shadow-md"
            >
              <UsersRound size={80} className="text-[#341C4E]" />
              <div>
                <h1 className="lg:text-2xl font-bold sm:text-sm">3,263</h1>
                <p className="lg:text-lg sm:text-sm">Students Served Today</p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className="bg-white h-36 sm:h-40 rounded-3xl flex items-center justify-center gap-4 p-5 shadow-md"
            >
              <CircleCheckBig size={50} className="text-[#341C4E]" />
              <div>
                <h1 className="lg:text-2xl font-bold sm:text-sm">2,337</h1>
                <p className="lg:text-lg sm:text-sm">Tokens Completed</p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className="bg-white h-36 sm:h-40 rounded-3xl flex items-center justify-center gap-4 p-5 shadow-md"
            >
              <Clock size={50} className="text-[#341C4E]" />
              <div>
                <h1 className="lg:text-2xl font-bold sm:text-sm">4 min</h1>
                <p className="lg:text-lg sm:text-sm">Average Wait Time</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
