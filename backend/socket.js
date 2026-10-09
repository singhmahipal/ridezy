const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function intializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`client connected ${socket.id}`);

    socket.on("join", async (data) => {
      const { userType, userId } = data;

      console.log(`user ${userId} joined as ${userType}`);

      if (userType == "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType == "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-captain-location", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "invalid location data" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`client disconnected ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  if (io) {
    console.log(`sending msg to ${socketId} `, messageObject);
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("socket id is not initialized");
  }
}

module.exports = { intializeSocket, sendMessageToSocketId };
