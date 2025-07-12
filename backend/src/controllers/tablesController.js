import Table from "../models/Table.js";

export async function getAllTables(req, res) {
  try {
    const filter = {};

    if (req.query.partySize) {
      filter.capacity = { $gte: +req.query.partySize };
    }

    const tables = await Table.find(filter).sort({ createdAt: 1 }); //-1 will sort backwards
    res.status(200).json(tables);
  } catch (error) {
    console.error("Error in getAllTables controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function addTable(req, res) {
  try {
    const { tableNumber, capacity, notes } = req.body;
    const newTable = new Table({
      tableNumber,
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
    const { tableNumber, capacity, notes } = req.body;
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      {
        tableNumber,
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
    const { tableName, date, time } = req.body;

    const table = await Table.findOne({ tableNumber: tableName });

    const isDuplicate = table.reservations.some(
      (reservation) => reservation.date === date && reservation.time === time
    );

    if (isDuplicate) {
      throw new Error("Date and time already reserved.");
    }

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    table.reservations.push({ date, time });

    await table.save();

    res.status(200).json({ message: "Reservation added", table });
  } catch (error) {
    console.error("Error in addReservationInTable controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
