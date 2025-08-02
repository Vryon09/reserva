import express from "express";
import {
  addReservationInTable,
  addTable,
  deleteReservationInTable,
  deleteTable,
  getAllTables,
  updateTable,
} from "../controllers/tablesController.js";

const router = express.Router();

//the more specific urls should be on the top because the not specific one can be triggered if the specific one match the pattern of the non specific one

router.get("/", getAllTables);

router.post("/", addTable);

router.post("/reservation", addReservationInTable);

router.delete("/reservation", deleteReservationInTable);

router.patch("/:id", updateTable);

router.delete("/:id", deleteTable);

export default router;
