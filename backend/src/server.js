import express from "express";
import tablesRoutes from "./routes/tablesRoutes.js";
import reservationsRoutes from "./routes/reservationsRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

app.use("/api/tables", tablesRoutes);
app.use("/api/reservations", reservationsRoutes);

app.listen(PORT, () => {
  console.log("Server started listening to Port: " + PORT);
});
