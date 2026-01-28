import { TrainFront } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState ,useContext} from "react";
import TokenCard from "./TokenCard";
import QueueModal from "./QueueModal";
import { socket } from "../../socket.js";
import { SocketContext } from "../../socketProvider.jsx";
const serviceName = "RailwayConsession";

const Token2 = () => {
  //  const { updatedToken } = useContext(TokenContext);
  const [showQueue, setShowQueue] = useState(false);
  const [queueData, setQueueData] = useState([]);
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchAccess = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/tokens/service/RailwayConsession/access"
        );
        const data = await res.json();
        setIsOpen(data.isOpen);
      } catch (err) {
        console.error("Failed to fetch access status", err);
      }
    };

    fetchAccess(); // initial call

    const interval = setInterval(fetchAccess, 3000); // every 3 sec
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchQueue();
    }, 5000); // fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const SERVICE_NAME = "RailwayConsession";
  const SERVICE_TIME = {
    Admission: 25,
    railwayConsession: 10,
    Library: 3,
    Canteen: 2,
    FeesPayment: 7,
  };

  const avgTime = SERVICE_TIME[SERVICE_NAME] || 3;

  const serviceQueue = queueData.filter(
    (item) =>
      item.serviceName === SERVICE_NAME &&
      item.status.toLowerCase() === "pending"
  );

  const currentQueue = serviceQueue.length;
  const expectedTime = currentQueue * avgTime;

  const handleCancelToken = async () => {
    try {
      await fetch(
        `http://localhost:5000/api/tokens/cancel/RailwayConsession/${token.tokenNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      // Remove token locally
      localStorage.removeItem(`${token.serviceName}Token`);
      setToken(null);
      setShow(false);

      // Optionally update queueData locally
      setQueueData((prev) =>
        prev.map((t) =>
          t.tokenNumber === token.tokenNumber
            ? { ...t, status: "Cancelled" }
            : t
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to cancel token");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("RailwayConsessionToken");

    if (!saved || saved === "undefined") return;

    try {
      const parsedToken = JSON.parse(saved);
      setToken(parsedToken);
    } catch (err) {
      console.error("Invalid token in localStorage", err);
      localStorage.removeItem("RailwayConsessionToken");
    }
  }, []);

  const handleGenerate = async () => {
  const userName = localStorage.getItem("queueUserName");
  const userId = localStorage.getItem("queueUserId");
  const serviceName = "RailwayConsession"; // ✅ define it

  if (!userId || !userName) {
    alert("Please login again");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/tokens/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        userName,
        serviceName,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Backend error:", error);
      alert(error.error || "Service is closed");
      return;
    }

    const data = await res.json();

    setToken(data.token);
    localStorage.setItem("RailwayConsessionToken", JSON.stringify(data.token));
    setShow(true);
  } catch (err) {
    console.error("Generate token failed:", err);
    alert("Server error");
  }
};


  const fetchQueue = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/tokens/list/RailwayConsession"
      );
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("Queue API did not return array:", data);
        setQueueData([]);
        return;
      }

      setQueueData(data);
    } catch (err) {
      console.error(err);
      setQueueData([]);
    }
  };

  const checkActiveToken = async () => {
    const userName = localStorage.getItem("queueUserName");
    if (!userName) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/tokens/user/RailwayConsession/${userName}`
      );
      const data = await res.json();

      if (!data || !data._id) {
        // Token completed or cancelled
        localStorage.removeItem("RailwayConsessionToken");
        setToken(null);
        setShow(false);
      } else {
        // Token still active
        setToken(data);
        localStorage.setItem("RailwayConsessionToken", JSON.stringify(data));
      }
    } catch (err) {
      console.error("Failed to fetch active token", err);
    }
  };

  useEffect(() => {
    checkActiveToken(); // check on mount

    const interval = setInterval(checkActiveToken, 3000); // check every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className=" token h-80 w-90 bg-white flex flex-col justify-around p-3 shadow-md shadow-gray-500 ">
        <div className="flex justify-center items-center  ">
          <div className="border border-double p-2 rounded-full">
            <TrainFront />
          </div>
          <h2 className="font-bold text-2xl">Token for Railway Conssesion </h2>
        </div>
        <div className="flex flex-col bg-gray-200 p-3">
          <p>Expected waiting time:{expectedTime}</p>
          <p>Current queue:{currentQueue}</p>
        </div>
        <div className="flex justify-between ">
          {!token && (
            <button
              disabled={!isOpen}
              onClick={handleGenerate}
              className={`p-3 rounded-2xl ${
                isOpen
                  ? "bg-black text-white"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Generate Token
            </button>
          )}

          {token && (
            <button
              className="p-3 bg-black text-white rounded-2xl hover:bg-white hover:text-black hover:border hover:font-bold"
              onClick={() => setShow(true)}
            >
              See My Token
            </button>
          )}

          <button
            className="p-3 bg-black text-white rounded-2xl flex items-center hover:bg-white hover:text-black hover:border hover:font-bold"
            onClick={() => {
              fetchQueue();
              setShowQueue(true);
            }}
          >
            View Queue <ArrowRight />
          </button>
        </div>
      </div>
      {show && token && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <TokenCard
            token={token}
            service="RailwayConsession"
            closeModal={() => setShow(false)}
            cancelToken={handleCancelToken}
          />
        </div>
      )}
      <QueueModal
        show={showQueue}
        onClose={() => setShowQueue(false)}
        serviceName="RailwayConsession"
        queue={queueData}
      />
    </div>
  );
};

export default Token2;
