import Reservation from "../models/Reservation.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { sendEmail } from "../utils/sendEmail.js";
import { notify } from "../server.js";
import QRCode from "qrcode";
import Table from "../models/Table.js";
import { clearScreenDown } from "readline";

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

export async function getReservation(req, res) {
  try {
    const reservation = Reservation.findById(req.params.id);

    if (!reservation)
      return res.status(404).json({ message: "Reservation not found." });

    res.status(200).json(reservation);
  } catch (error) {
    console.error("Error in getReservation controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function addReservation(req, res) {
  try {
    const {
      tableId,
      tableName,
      name,
      email,
      reservationDate,
      status,
      reservationCode,
    } = req.body;

    const newReservation = new Reservation({
      tableId,
      tableName,
      name,
      email,
      reservationDate,
      status,
      reservationCode,
    });

    const savedReservation = await newReservation.save();

    notify("reservationAdded", savedReservation);

    res.status(201).json(savedReservation);
  } catch (error) {
    console.error("Error in addReservation controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function updateReservation(req, res) {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    const reservation = await Reservation.findById(req.params.id);

    if (!updatedReservation || !reservation)
      return res.status(404).json({ message: "No reservation found." });

    await sendEmail({
      to: reservation.email,
      subject: `Reservation Update – Status: ${reservation.status.toUpperCase()}`,
      text: `Hi ${reservation.name}, your reservation for ${dayjs(
        reservation.reservationDate
      )
        .tz("Asia/Manila")
        .format("MMMM DD, YYYY, h:mm a")} (${
        reservation.tableName
      }) is now marked as: ${reservation.status}.`,
      html: `
      <p>Hi <b>${reservation.name}</b>,</p>
      <p>Your reservation for <b>${dayjs(reservation.reservationDate)
        .tz("Asia/Manila")
        .format("MMMM DD, YYYY, h:mm a")}</b> (Table <b>${
        reservation.tableName
      }</b>) is now marked as:</p>
      <h2 style="color:#333;">${reservation.status.toUpperCase()}</h2>
      <h2 style="color:#333;">Code: ${reservation.reservationCode}</h2>
      <p>Monitor your reservation to get your QRCode.</p>
      <p>Thank you for choosing our restaurant!</p>
    `,
    });

    notify("reservationUpdated", updatedReservation);
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

    notify("reservationDeleted", deletedReservation);
    res.status(200).json(deletedReservation);
  } catch (error) {
    console.error("Error in updateReservation controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function deleteAllReservations(req, res) {
  try {
    const result = await Reservation.deleteMany({});
    res.status(200).json({
      message: "All reservations deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error in deleteAllReservations controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function getReservationByCode(req, res) {
  try {
    if (req.params.reservationCode.length > 4) {
      const credentials = req.params.reservationCode.split(",");
      // const userDate = new Date(credentials[2]);

      const start = dayjs(credentials[2])
        .tz("Asia/Manila")
        .startOf("day")
        .toDate();
      const end = dayjs(credentials[2]).tz("Asia/Manila").endOf("day").toDate();

      const filter = {
        name: credentials[0],
        email: credentials[1],
        reservationDate: { $gte: start, $lte: end },
      };
      const reservation = await Reservation.find(filter);

      console.log(credentials[0]);
      console.log(credentials[1]);
      console.log(reservation);
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

export async function getTodaysStats(req, res) {
  try {
    const start = dayjs().tz("Asia/Manila").startOf("day").toDate();
    const end = dayjs().tz("Asia/Manila").endOf("day").toDate();

    const tomStart = dayjs()
      .tz("Asia/Manila")
      .add(1, "day")
      .startOf("day")
      .toDate();
    const tomEnd = dayjs()
      .tz("Asia/Manila")
      .add(1, "day")
      .endOf("day")
      .toDate();

    const stats = await Reservation.aggregate([
      {
        $match: {
          reservationDate: { $gte: start, $lte: end },
          status: {
            $in: ["confirmed", "rejected", "seated", "done", "cancelled"],
          },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const pendingTom = await Reservation.countDocuments({
      reservationDate: { $gte: tomStart, $lte: tomEnd },
      status: "pending",
    });

    const statuses = ["confirmed", "rejected", "seated", "done", "cancelled"];
    const result = [];
    statuses.forEach((status) => {
      const found = stats.find((s) => s._id === status);
      result.push({ status, count: found ? found.count : 0 });
    });

    result.push({ status: "pending", count: pendingTom });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getTodaysStats controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function getReservationCountsByDay(req, res) {
  try {
    const status = req.query.status || "all";
    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    const resp = [];
    const dayNamess = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const allReservations = await Reservation.find(filter);

    const allReservationDates = allReservations.map(
      (reservation) => reservation.reservationDate
    );

    dayNamess.forEach((day) => {
      const currDayDates = allReservationDates.filter(
        (date) => day === dayjs(date).tz("Asia/Manila").format("dddd")
      ).length;

      resp.push({ _id: day, reservationDates: currDayDates });
    });

    res.status(200).json(resp);
  } catch (err) {
    console.error("Error in getReservationEachDay controller.", err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function getResNextXHrs(req, res) {
  try {
    const { hours } = req.query;

    const start = dayjs().tz("Asia/Manila").toDate();
    const end = dayjs().tz("Asia/Manila").add(+hours, "hour").toDate();

    const filter = {
      status: "confirmed",
      reservationDate: { $gte: start, $lte: end },
    };

    const reservations = await Reservation.find(filter);

    const total = await Reservation.countDocuments(filter);

    res.status(200).json({ reservations, total });
  } catch (error) {
    console.error("Error in getResNextXHrs controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

async function generateReservationQR(reservation) {
  try {
    const res = reservation[0];

    const data = JSON.stringify({
      _id: res._id,
      tableId: res.tableId,
    });

    const qr = await QRCode.toDataURL(data);

    return qr;
  } catch (error) {
    console.log("Can't generate QR Code: " + error);
    return null;
  }
}

export async function getQRCode(req, res) {
  try {
    const code = req.params.code;
    const reservation = await Reservation.find({
      reservationCode: code,
      status: "confirmed",
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    const qr = await generateReservationQR(reservation);

    res.status(200).json(qr);
  } catch (error) {
    console.error("Error in getQRCode controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
