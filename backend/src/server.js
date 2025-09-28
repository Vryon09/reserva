import "dotenv/config";
import express from "express";
import cors from "cors";
import tablesRoutes from "./routes/tablesRoutes.js";
import reservationsRoutes from "./routes/reservationsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { connectDB } from "./config/db.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: [
      "https://reservaa.netlify.app",
      "http://localhost:5173",
      "http://192.168.18.9:5173",
    ],
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

app.use("/api/tables", tablesRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/admin", adminRoutes);

const io = new Server(server, {
  cors: {
    origin: [
      "https://reservaa.netlify.app",
      "http://localhost:5173",
      "http://192.168.18.9:5173",
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected: " + socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });
});

export function notify(event, data) {
  io.emit(event, data);
}

const PORT = process.env.PORT || 5001;

connectDB();

server.listen(PORT, () =>
  console.log("Server started listening to Port: " + PORT)
);
