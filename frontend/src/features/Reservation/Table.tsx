import { useNavigate } from "react-router-dom";
import { useReservationForm } from "../../contexts/useReservationForm";
import { generateTimeOptions } from "../../services/helperFunctions";
import type { TableTypes } from "./Tables";
import { format, parse } from "date-fns";
import Button from "../../ui/Button";

interface TableProps {
  selectedTable: string;
  setSelectedTable: React.Dispatch<React.SetStateAction<string>>;
  table: TableTypes;
}

function Table({ selectedTable, setSelectedTable, table }: TableProps) {
  const { dispatch, date, time } = useReservationForm();
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-48 flex-col items-baseline gap-1 border-1 p-2"
      style={
        selectedTable === table._id ? { backgroundColor: "aquamarine" } : {}
      }
      key={table._id}
      onClick={() => {
        setSelectedTable(table._id);
      }}
    >
      <p className="font-semibold">Table {table.tableNumber}</p>
      <p>Description: {table.notes}</p>
      <p>Capacity: {table.capacity}</p>
      {selectedTable === table._id && (
        <>
          <select
            className="input-normal w-full"
            value={time}
            onChange={(e) =>
              dispatch({ type: "setTime", payload: e.target.value })
            }
          >
            <option value="none">Time</option>
            {generateTimeOptions({ start: 8, end: 22, table, date }).map(
              (time) => (
                <option key={time} value={time}>
                  {format(parse(time, "HH:mm", new Date()), "h:mm a")}
                </option>
              ),
            )}
          </select>

          <div className="mt-2 flex w-full justify-end">
            <Button
              type="confirm"
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
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Table;
