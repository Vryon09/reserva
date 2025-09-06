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

router.get("/stats", getTodaysStats);

router.get("/reservation-hour", getResNextXHrs);

router.get("/eachday", getReservationCountsByDay);

router.get("/:reservationCode", getReservationByCode);

router.delete("/deleteallres", deleteAllReservations);

router.post("/", addReservation);

router.patch("/:id", updateReservation);

router.delete("/:id", deleteReservation);

export default router;
