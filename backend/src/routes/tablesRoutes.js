import express from "express";
import {
  addReservationInTable,
  addTable,
  deleteAllTablesReservations,
  deleteReservationInTable,
  deleteTable,
  getAllTables,
  getTableByName,
  syncTableStatus,
  updateTable,
} from "../controllers/tablesController.js";

const router = express.Router();

//the more specific urls should be on the top because the not specific one can be triggered if the specific one match the pattern of the non specific one

router.get("/", getAllTables);

router.get("/:tableName", getTableByName);

router.post("/", addTable);

router.post("/reservation", addReservationInTable);

router.delete("/reservation", deleteReservationInTable);

router.delete("/deleteallres", deleteAllTablesReservations);

router.patch("/:tableName/reservations/:reservationId/status", syncTableStatus);

router.patch("/:id", updateTable);

router.delete("/:id", deleteTable);

export default router;
