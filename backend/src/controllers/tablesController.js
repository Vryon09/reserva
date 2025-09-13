import Table from "../models/Table.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function getAllTables(req, res) {
  try {
    const filter = {};
    let tables;

    if (req.query.nexthours) {
      const start = dayjs(new Date()).startOf("hour").add(1, "hour").toDate();

      const end = dayjs(new Date())
        .startOf("hour")
        .add(req.query.nexthours, "hour")
        .toDate();

      //add a status in table reservation for this to fix
      tables = await Table.aggregate([
        {
          $project: {
            tableName: 1,
            reservations: {
              $filter: {
                input: "$reservations",
                as: "r",
                cond: {
                  $and: [
                    { $gte: ["$$r.reservationDate", start] },
                    {
                      $lte: ["$$r.reservationDate", end],
                    },
                    {
                      $eq: ["$$r.status", "confirmed"],
                    },
                  ],
                },
              },
            },
          },
        },
      ]);
    }

    if (req.query.partySize) {
      filter.capacity = { $gte: +req.query.partySize };
      tables = await Table.find(filter).sort({ capacity: 1 });
    }

    res.status(200).json(tables);
  } catch (error) {
    console.error("Error in getAllTables controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function getTable(req, res) {
  try {
    const _id = req.params.id;

    const table = await Table.findById(_id);

    if (!table) return res.status(404).json({ message: "Table not found." });

    res.status(200).json(table);
  } catch (error) {
    console.error("Error in getTableByName controller.", error);
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
    const { tableName, capacity, notes, reservations } = req.body;
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      {
        tableName,
        capacity,
        notes,
        reservations,
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

export async function addReservation(req, res) {
  try {
    const { tableId, name, email, reservationDate, _id } = req.body;

    const table = await Table.findById(tableId);

    const isDuplicate = table.reservations.some(
      (reservation) => reservation.date === reservationDate
    );

    if (isDuplicate) {
      throw new Error("Date and time already reserved.");
    }

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    table.reservations.push({ reservationDate, name, email, _id });

    await table.save();

    res.status(200).json({ message: "Reservation added", table });
  } catch (error) {
    console.error("Error in addReservationInTable controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function deleteReservation(req, res) {
  try {
    const { id, reservationId } = req.params;

    const result = await Table.updateOne(
      { _id: id },
      {
        $pull: { reservations: { _id: reservationId } },
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

export async function deleteAllTablesReservations(req, res) {
  try {
    const result = await Table.updateMany({}, { $set: { reservations: [] } });

    res.status(200).json({
      message: "All reservations deleted from all tables",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error in deleteAllTablesReservations controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function updateReservationStatus(req, res) {
  try {
    const { id, reservationId } = req.params;
    const { status } = req.body;

    const result = await Table.updateOne(
      { _id: id, "reservations._id": reservationId },
      { $set: { "reservations.$.status": status } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error in updateReservationStatus controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function getTableOccupancy(req, res) {
  try {
    const start = dayjs(new Date())
      .startOf("hour")
      .subtract(1, "hour")
      .toDate();
    const end = dayjs(new Date()).startOf("hour").add(1, "hour").toDate();

    const tableCount = await Table.countDocuments();
    // const occupiedCount = await Table.countDocuments({
    //   "reservations.status": { $in: ["confirmed", "seated"] },
    //   "reservations.reservationDate": { $gte: start, $lte: end },
    // }); //this is wrong
    const occupiedCount = await Table.countDocuments({
      reservations: {
        $elemMatch: {
          status: { $in: ["confirmed", "seated"] },
          reservationDate: { $gte: start, $lte: end },
        },
      },
    });

    res.status(200).json({ tableCount, occupiedCount });
  } catch (error) {
    console.error("Error in getTableOccupancy controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function getTopTables(req, res) {
  try {
    const top3Tables = await Table.aggregate([
      { $addFields: { reservationCount: { $size: "$reservations" } } },
      { $sort: { reservationCount: -1 } },
      { $limit: 3 },
      { $project: { tableName: 1, reservationCount: 1 } },
    ]);

    res.status(200).json(top3Tables);
  } catch (error) {
    console.error("Error in getTopTables controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
