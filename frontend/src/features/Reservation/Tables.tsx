import { useNavigate } from "react-router-dom";
// import { tables } from "../../testdata";
import { useQuery } from "@tanstack/react-query";
import { getAllTables } from "../../services/apiTable";
import { useReservationForm } from "../../contexts/useReservationForm";
import { useState } from "react";

interface Table {
  _id: string;
  tableNumber: string;
  capacity: number;
  notes: string;
  status: string;
}

function generateTimeOptions(start = 8, end = 22) {
  const options = [];

  for (let hour = start; hour <= end - 1; hour++) {
    const time = new Date();
    time.setHours(hour, 0, 0);

    const formatted = time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    options.push(formatted);
  }

  return options;
}

function Tables() {
  const [selectedTable, setSelectedTable] = useState("");
  const { dispatch, time } = useReservationForm();

  const { data: tables, isPending: isTablesPending } = useQuery<Table[]>({
    queryFn: getAllTables,
    queryKey: ["tables"],
  });

  const navigate = useNavigate();

  if (isTablesPending) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Choose Table</p>
      <div className="grid grid-cols-2 gap-2">
        {tables?.map((table) => (
          <div
            className="border-1 p-2"
            style={
              selectedTable === table._id
                ? { backgroundColor: "aquamarine" }
                : {}
            }
            key={table._id}
            onClick={() => {
              setSelectedTable(table._id);
            }}
          >
            <p>Table {table.tableNumber}</p>
            <p>{table.notes}</p>
            <p>Party Size: {table.capacity}</p>
            {selectedTable === table._id && (
              <select
                className="border-1"
                value={time}
                onChange={(e) =>
                  dispatch({ type: "setTime", payload: e.target.value })
                }
              >
                <option value="none">Choose Time</option>
                {generateTimeOptions().map((time, i) => (
                  <option key={i}>{time}</option>
                ))}
              </select>
            )}

            <button
              className="cursor-pointer border-1"
              onClick={() => {
                if (time === "none") {
                  console.log("Choose time!");
                  return;
                }

                dispatch({ type: "setTable", payload: table.tableNumber });
                navigate(`/reserve/personal-information`);
              }}
            >
              Choose
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tables;
