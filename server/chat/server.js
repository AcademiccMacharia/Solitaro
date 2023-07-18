const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Assuming `result` is the data you want to send to the client
  const result = { /* Your data here */ };

  // Send data to the connected client as soon as it connects
  if (!socket.sentMydata) {
    socket.emit("mydata", { feed: result });
    socket.sentMydata = true;
  }

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
