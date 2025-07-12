import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    tableNumber: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: "pending" },
    reservationCode: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
