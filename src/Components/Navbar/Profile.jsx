import { useEffect, useState } from "react";
import axios from "axios";
import { User, Lock } from "lucide-react";

const Profile = () => {
  const userId = localStorage.getItem("queueUserId");

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/UserLogin/login/${userId}`)
      .then((res) => {
        setUser(res.data);
        setUsername(res.data.username);
      })
      .catch(console.error);
  }, [userId]);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/UserLogin/update/${userId}`, {
        username,
        oldPassword,
        newPassword,
      });

      alert("Profile updated successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-lg mx-auto  bg-white shadow-xl rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>

      {/* USERNAME */}
      <div className="mb-4">
        <label className="flex items-center gap-2 font-semibold mb-1">
          <User size={18} /> Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* EMAIL */}
      <div className="mb-4">
        <label className="font-semibold mb-1 block">Email</label>
        <input
          value={user.email}
          disabled
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* CHANGE PASSWORD */}
      <h3 className="font-semibold text-lg mt-6 mb-2 flex items-center gap-2">
        <Lock size={18} /> Change Password
      </h3>

      <input
        type="password"
        placeholder="Old password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mb-2"
      />

      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mb-4"
      />

      <button
        onClick={handleUpdateProfile}
        disabled={loading}
        className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition"
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
};

export default Profile;
