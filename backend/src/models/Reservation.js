import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    tableName: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    reservationDate: { type: Date, required: true, index: true },
    status: { type: String, default: "pending", index: true },
    reservationCode: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

reservationSchema.index({ createdAt: -1 });

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
