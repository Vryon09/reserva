import express from "express";
import {
  addReservation,
  deleteAllReservations,
  deleteReservation,
  getAllReservations,
  getQRCode,
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

router.get("/code/key/:reservationCode", getReservationByCode);
router.get("/code/qrcode/:code", getQRCode);

router.patch("/:id", updateReservation);
router.delete("/:id", deleteReservation);

export default router;
