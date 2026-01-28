import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later connect backend API here
    console.log("Feedback Submitted:", { rating, comment });

    alert("Thank you for your feedback!");

    setRating(0);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center px-4 py-10">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 sm:p-8"
      >
        {/* Header */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="bg-purple-100 p-3 rounded-full">
            <MessageSquare className="text-purple-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Give Feedback
          </h1>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Rating */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Rate Your Experience
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className={`cursor-pointer transition ${
                    star <= rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Feedback Comment (optional)
            </label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your feedback..."
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={rating === 0}
            className={`w-full py-3 rounded-lg font-semibold shadow-md transition
              ${
                rating === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#341C4E] text-white hover:bg-[#2a153e]"
              }`}
          >
            Submit Feedback
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Feedback;

