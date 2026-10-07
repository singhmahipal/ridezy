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

      if (userType == "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType == "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("disconnect", () => {
      console.log(`client disconnected ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("socket id is not initialized");
  }
}

module.exports = { intializeSocket, sendMessageToSocketId };
