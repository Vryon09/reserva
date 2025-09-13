import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    reservationDate: { type: Date, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
);

const tableSchema = new mongoose.Schema(
  {
    tableName: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      index: true,
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
