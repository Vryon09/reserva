import express from "express";
import {
  addReservation,
  addTable,
  deleteAllTablesReservations,
  deleteReservation,
  deleteTable,
  getAllTables,
  getTable,
  getTableOccupancy,
  updateReservationStatus,
  updateTable,
} from "../controllers/tablesController.js";

const router = express.Router();

//the more specific urls should be on the top because the not specific one can be triggered if the specific one match the pattern of the non specific one

//Reservations
router.post("/reservation", addReservation);

router.delete("/reservations", deleteAllTablesReservations);

router.delete("/:id/reservations/:reservationId", deleteReservation);

router.patch("/:id/reservations/:reservationId", updateReservationStatus);

//Stats
router.get("/stats/table-occupancy", getTableOccupancy);

//Tables
router.get("/", getAllTables);

router.get("/:id", getTable);

router.post("/", addTable);

router.patch("/:id", updateTable);

router.delete("/:id", deleteTable);

export default router;
