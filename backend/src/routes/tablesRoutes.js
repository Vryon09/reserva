import express from "express";
import {
  addReservationInTable,
  addTable,
  deleteTable,
  getAllTables,
  updateTable,
} from "../controllers/tablesController.js";

const router = express.Router();

router.get("/", getAllTables);

router.post("/", addTable);

router.patch("/:id", updateTable);

router.delete("/:id", deleteTable);

router.post("/reservation", addReservationInTable);

export default router;
