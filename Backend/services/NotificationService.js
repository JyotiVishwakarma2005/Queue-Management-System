
import Notification from "../Models/notification.js";
import { getTokenModel } from "../Models/Token.js";

const notifyQueueUsers = async (service, io) => {
  const TokenModel = getTokenModel(service);

  const queue = await TokenModel.find({
    status: { $in: ["pending", "serving"] },
  }).sort({ createdAt: 1 });

  if (!queue.length) return;

  // 🔔 CURRENT USER
  const current = queue[0];

  const currentNotification = {
    userId: current.userId,
    serviceName: service,
    message: "Your turn has come. Please proceed to the counter.",
    type: "current",
    createdAt: new Date(),
  };

  await Notification.create(currentNotification);

  io.to(current.userId.toString())
    .emit("new_notification", currentNotification);

  // 🔔 NEXT USER
  if (queue[1]) {
    const next = queue[1];

    const nextNotification = {
      userId: next.userId,
      serviceName: service,
      message: "Your turn is next. Please be ready.",
      type: "next",
      createdAt: new Date(),
    };

    await Notification.create(nextNotification);

    io.to(next.userId.toString())
      .emit("new_notification", nextNotification);
  }
};

export default notifyQueueUsers;






