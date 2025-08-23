import Reservation from "../models/Reservation.js";

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
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filter.date = { $gte: today };
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
    console.log(error);
  }
}

export async function getTodaysReservation(req, res) {
  const limit = +req.query.limit || 6;
  const page = +req.query.page || 1;

  try {
    // Start of today
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    // End of today
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const filter = { date: { $gte: start, $lte: end } };
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
    const { tableNumber, name, phone, date, time, status, reservationCode } =
      req.body;
    const newReservation = new Reservation({
      tableNumber,
      name,
      phone,
      date,
      time,
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
    const { tableNumber, name, phone, time, status } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { tableNumber, name, phone, time, status },
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
    // const { tableNumber, name, phone, time, status } = req.body;
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
