import Reservation from "../models/Reservation.js";

export async function getAllReservations(req, res) {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    } else if (req.query.notStatus) {
      const excludedStatus = req.query.notStatus.split(",");
      filter.status = { $nin: excludedStatus };
    }

    const reservations = await Reservation.find(filter).sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error in getAllReservation controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function getReservationByCode(req, res) {
  try {
    const reservation = await Reservation.findOne({
      reservationCode: req.params.reservationCode,
    });

    if (!reservation)
      return res.status(404).json({ message: "Reservation not found." });

    res.status(200).json(reservation);
  } catch (error) {
    console.log(error);
  }
}

export async function addReservation(req, res) {
  try {
    const { tableNumber, name, phone, time, status, reservationCode } =
      req.body;
    const newReservation = new Reservation({
      tableNumber,
      name,
      phone,
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
