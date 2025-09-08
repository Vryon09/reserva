import express from "express";
import {
  addReservation,
  deleteAllReservations,
  deleteReservation,
  getAllReservations,
  getReservationByCode,
  getReservationCountsByDay,
  getResNextXHrs,
  getTodaysStats,
  updateReservation,
} from "../controllers/reservationsController.js";

const router = express.Router();

router.get("/", getAllReservations);
router.post("/", addReservation);
router.delete("/", deleteAllReservations);

router.get("/stats/today", getTodaysStats);
router.get("/stats/next-hours", getResNextXHrs);
router.get("/stats/by-day", getReservationCountsByDay);

router.get("/code/:reservationCode", getReservationByCode);

router.patch("/:id", updateReservation);
router.delete("/:id", deleteReservation);

export default router;
