import Reservation from "../models/Reservation.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function getAllReservations(req, res) {
  const limit = +req.query.limit || 6;
  const page = +req.query.page || 1;

  try {
    const filter = {};
    const { status, notStatus } = req.query;

    if (status && status !== "all") {
      filter.status = status;
    } else if (notStatus) {
      const excludedStatus = notStatus.split(",");
      filter.status = { $nin: excludedStatus };
    }

    if (status !== "all") {
      const nowPH = dayjs().tz("Asia/Manila").startOf("day");
      const nowUTC = nowPH.toDate();

      filter.reservationDate = { $gte: nowUTC };
    }

    const total = await Reservation.countDocuments(filter);

    const reservations = await Reservation.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.status(200).json({ reservations, total });
  } catch (error) {
    console.error("Error in getAllReservation controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function getReservationByCode(req, res) {
  try {
    if (req.params.reservationCode.length > 4) {
      const credentials = req.params.reservationCode.split(",");
      const userDate = new Date(credentials[2]);
      const filter = {
        name: credentials[0],
        phone: credentials[1],
        date: userDate.toISOString(),
      };
      const reservation = await Reservation.find(filter);
      res.status(200).json(reservation);
    }

    if (req.params.reservationCode.length === 4) {
      const reservation = await Reservation.findOne({
        reservationCode: req.params.reservationCode,
      });

      if (!reservation)
        return res.status(404).json({ message: "Reservation not found." });

      res.status(200).json(reservation);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getTodaysReservation(req, res) {
  const limit = +req.query.limit || 6;
  const page = +req.query.page || 1;

  try {
    const start = dayjs().tz("Asia/Manila").startOf("day").toDate();
    const end = dayjs().tz("Asia/Manila").endOf("day").toDate();

    const filter = { reservationDate: { $gte: start, $lte: end } };
    const { status } = req.query;

    if (status !== "all") {
      filter.status = status;
    }

    const total = await Reservation.countDocuments(filter);

    const reservations = await Reservation.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    res.status(200).json({ reservations, total });
  } catch (error) {
    console.error("Error in getAllReservation controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function addReservation(req, res) {
  try {
    const { tableName, name, phone, reservationDate, status, reservationCode } =
      req.body;
    const newReservation = new Reservation({
      tableName,
      name,
      phone,
      reservationDate,
      status,
      reservationCode,
    });

    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    console.error("Error in addReservation controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function updateReservation(req, res) {
  try {
    const { tableName, name, phone, time, status } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { tableName, name, phone, time, status },
      { new: true }
    );

    if (!updatedReservation)
      return res.status(404).json({ message: "No reservation found." });

    res.status(200).json(updatedReservation);
  } catch (error) {
    console.error("Error in updateReservation controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function deleteReservation(req, res) {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      req.params.id
    );

    if (!deletedReservation)
      return res.status(404).json({ message: "No reservation found." });

    res.status(200).json(deletedReservation);
  } catch (error) {
    console.error("Error in updateReservation controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
