import mongoose from "mongoose";

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
    status: {
      type: String,
      enum: ["available", "reserved", "occupied", "unavailable"],
      default: "available",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;
