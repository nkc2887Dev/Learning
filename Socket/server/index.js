const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  // Simulating cricket score updates every 5 seconds
  setInterval(() => {
    const score = `India: ${Math.floor(Math.random() * 200)}/${Math.floor(Math.random() * 10)}`;
    socket.emit("liveScore", score);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  console.log("Socket.io server running on port 5000");
});
