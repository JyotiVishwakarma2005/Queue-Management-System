import { useEffect, useState } from "react";

const LoginPopup = ({ onLogin }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  // Auto popup after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(user);
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
      )}

      <div
        className={`fixed left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white shadow-lg rounded-xl p-6 z-50 duration-500 ${
          show ? "top-14" : "-top-[400px]"
        }`}
      >
        <button
          onClick={() => setShow(false)}
          className="absolute right-4 top-3 text-gray-700 text-xl font-bold hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
          User Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Enter your email:
            </label>
            <input
              type="email"
              placeholder="Name@gmail.com"
              required
              className="w-full mt-1 p-2 border border-gray-400 rounded-lg outline-[#341C4E]"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              required
              className="w-full mt-1 p-2 border border-gray-400 rounded-lg outline-blue-500"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#341C4E] hover:bg-[#341C4E] text-white py-2 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
