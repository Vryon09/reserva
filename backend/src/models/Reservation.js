import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    tableNumber: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true, index: true },
    status: { type: String, default: "pending", index: true },
    reservationCode: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

reservationSchema.index({ createdAt: -1 });

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
