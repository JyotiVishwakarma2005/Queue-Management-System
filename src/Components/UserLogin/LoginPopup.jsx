import { useEffect, useState } from "react";

const LoginPopup = ({ forceOpen = false, onAuthSuccess }) => {
  const [show, setShow] = useState(false);

  // 🔹 User input state (you removed this by mistake)
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 🔹 Loading state (you removed this too)
  const [loading, setLoading] = useState(false);

  // 🔥 Open automatically on first load IF user not logged in
  useEffect(() => {
    if (!localStorage.getItem("queueUserToken")) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // 🔥 Open when logout triggers popup
  useEffect(() => {
    if (forceOpen) {
      setShow(true);
    }
  }, [forceOpen]);

  // Handle signup/login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/UserLogin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Authentication failed");
        setLoading(false);
        return;
      }

      // Save Session
      localStorage.setItem("queueUserToken", data.token);
      localStorage.setItem("queueUserName", data.user.username);
      localStorage.setItem("queueUserId", data.user._id);

      onAuthSuccess?.(data.user);
      setShow(false);
    } catch (err) {
      alert("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      )}

      {/* Popup */}
      {show && (
        <div className="fixed left-1/2 top-20 -translate-x-1/2 w-[90%] max-w-sm bg-white p-6 rounded-xl z-50 animate-slideDown">
          <h2 className="text-xl font-semibold text-center mb-4">Sign up</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              placeholder="Name"
              required
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full p-2 border rounded"
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 border rounded"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              className="w-full p-2 border rounded"
            />

            <button
              disabled={loading}
              className="w-full bg-[#341C4E] text-white py-2 rounded"
            >
              {loading ? "Please wait..." : "Continue"}
            </button>
          </form>

          <div className="mt-4 space-y-2">
            <button className="w-full border py-2 rounded">
              Continue with Google
            </button>
            <button className="w-full border py-2 rounded">
              Continue with GitHub
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPopup;
