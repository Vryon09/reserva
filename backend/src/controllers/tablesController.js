import Table from "../models/Table.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function getAllTables(req, res) {
  try {
    const filter = {};

    if (req.query.partySize) {
      filter.capacity = { $gte: +req.query.partySize };
    }

    if (req.query.nexthours) {
      const start = dayjs(new Date()).startOf("hour").add(1, "hour").toDate();

      const end = dayjs(new Date())
        .startOf("hour")
        .add(req.query.nexthours, "hour")
        .toDate();

      filter["reservations.reservationDate"] = { $gte: start, $lte: end };
    }

    console.log(filter);

    const tables = await Table.find(filter).sort({ capacity: 1 });
    res.status(200).json(tables);
  } catch (error) {
    console.error("Error in getAllTables controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function addTable(req, res) {
  try {
    const { tableName, capacity, notes } = req.body;
    const newTable = new Table({
      tableName,
      capacity,
      notes,
    });

    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    console.error("Error in addTable controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function updateTable(req, res) {
  try {
    const { tableName, capacity, notes } = req.body;
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      {
        tableName,
        capacity,
        notes,
      },
      { new: true }
    );

    if (!updateTable)
      return res.status(404).json({ message: "Table not found" });

    res.status(200).json(updatedTable);
  } catch (error) {
    console.error("Error in updateTable controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function deleteTable(req, res) {
  try {
    const deletedTable = await Table.findByIdAndDelete(req.params.id);
    if (!deletedTable)
      return res.status(404).json({ message: "Table not found" });

    res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTable controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
export async function addReservationInTable(req, res) {
  try {
    const { tableName, name, phone, reservationDate, _id } = req.body;

    const table = await Table.findOne({ tableName: tableName });

    const isDuplicate = table.reservations.some(
      (reservation) => reservation.date === reservationDate
    );

    if (isDuplicate) {
      throw new Error("Date and time already reserved.");
    }

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    table.reservations.push({ reservationDate, name, phone, _id });

    await table.save();

    res.status(200).json({ message: "Reservation added", table });
  } catch (error) {
    console.error("Error in addReservationInTable controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function deleteReservationInTable(req, res) {
  try {
    const { tableName, reservationDate } = req.body;

    const result = await Table.updateOne(
      { tableName },
      {
        $pull: { reservations: { reservationDate: new Date(reservationDate) } },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message: "No reservation with that date was found in the table.",
      });
    }
  } catch (error) {
    console.error("Error in deleteReservationInTable controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
