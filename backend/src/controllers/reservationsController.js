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
      // const userDate = new Date(credentials[2]);

      const start = dayjs(credentials[2])
        .tz("Asia/Manila")
        .startOf("day")
        .toDate();
      const end = dayjs(credentials[2]).tz("Asia/Manila").endOf("day").toDate();

      const filter = {
        name: credentials[0],
        phone: credentials[1],
        reservationDate: { $gte: start, $lte: end },
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
          status: { $in: ["confirmed", "rejected", "seated", "done"] },
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

    const statuses = ["confirmed", "rejected", "seated", "done"];
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
    const { status } = req.query;
    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }
    // const pipeline = [];

    // if (status && status !== "all") {
    //   pipeline.push({
    //     $match: {
    //       status: status,
    //     },
    //   });
    // }

    // pipeline.push({
    //   $group: {
    //     _id: { $dayOfWeek: "$reservationDate" },
    //     reservationDates: { $push: "$reservationDate" },
    //   },
    // });

    // const reservationDatas = await Reservation.aggregate(pipeline);

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

    // console.log(resp);
    // const allReservations = [];

    // reservationDatas.forEach((data) => {
    //   allReservations.push(...data.reservationDates);
    // });

    // const allReservationsDay = allReservations.map((date) => {
    //   return dayjs(date).format("dddd");
    // });

    // const allReservationsDayPH = allReservations.map((day) =>
    //   dayjs(day).tz("Asia/Manila").format("dddd")
    // );

    // console.log(allReservationsDay);
    // console.log(allReservationsDayPH);
    // console.log(reservationDatas);

    // const reservationEachDay = [];
    // const dayNames = [
    //   "Sunday",
    //   "Monday",
    //   "Tuesday",
    //   "Wednesday",
    //   "Thursday",
    //   "Friday",
    //   "Saturday",
    // ];

    // dayNames.forEach((day, i) => {
    //   const currDay = reservationDatas.find((data) => data._id - 1 === i);
    //   const currDayObj = {
    //     _id: day,
    //     reservationDates: currDay ? currDay.reservationDates.length : 0,
    //   };
    //   reservationEachDay.push(currDayObj);
    // });

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
