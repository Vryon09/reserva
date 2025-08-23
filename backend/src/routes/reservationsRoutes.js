import express from "express";
import {
  addReservation,
  deleteReservation,
  getAllReservations,
  getReservationByCode,
  getTodaysReservation,
  updateReservation,
} from "../controllers/reservationsController.js";

const router = express.Router();

router.get("/", getAllReservations);

router.get("/today", getTodaysReservation);

router.get("/:reservationCode", getReservationByCode);

router.post("/", addReservation);

router.patch("/:id", updateReservation);

router.delete("/:id", deleteReservation);

export default router;
