import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const tableSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    notes: {
      type: String,
      default: "",
    },
    reservations: { type: [reservationSchema], default: [] },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;
