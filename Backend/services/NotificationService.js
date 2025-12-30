import Notification from "../Models/notification.js";
import { getTokenModel } from "../Models/Token.js";

const notifyQueueUsers = async (service, io) => {
  const TokenModel = getTokenModel(service);

  const queue = await TokenModel.find({
    status: { $in: ["pending", "serving"] },
  }).sort({ createdAt: 1 });

  if (!queue.length) return;

  const current = queue[0];

  const currentNotification = {
    userName: current.userName,
    serviceName: service,
    message: "Your turn has come. Please proceed to the counter.",
    type: "current",
    createdAt: new Date(),
  };

  // Save to DB
  await Notification.create(currentNotification);

  // Emit full notification
  io?.to(current.userName).emit("new_notification", currentNotification);

  if (queue[1]) {
    const next = queue[1];

    const nextNotification = {
      userName: next.userName,
      serviceName: service,
      message: "Your turn is next. Please be ready.",
      type: "next",
      createdAt: new Date(),
    };

    await Notification.create(nextNotification);

    io?.to(next.userName).emit("new_notification", nextNotification);
  }
  
};

export default notifyQueueUsers;



