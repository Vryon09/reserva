import { useNavigate } from "react-router-dom";
import { useReservationForm } from "../../contexts/useReservationForm";
import { generateTimeOptions } from "../../services/helperFunctions";
import type { TableTypes } from "./Tables";
import { format, parse } from "date-fns";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import toast from "react-hot-toast";

interface TableProps {
  selectedTable: string;
  setSelectedTable: React.Dispatch<React.SetStateAction<string>>;
  table: TableTypes;
}

function Table({ selectedTable, setSelectedTable, table }: TableProps) {
  const { dispatch, date, time, partySize } = useReservationForm();
  const navigate = useNavigate();
  // className="flex min-h-48 cursor-pointer flex-col items-baseline gap-1 border-1 p-2"

  return (
    <Card
      additionalStyle="cursor-pointer gap-1 flex flex-col items-baseline min-h-48"
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
          {table.capacity - +partySize > 5 && (
            <p className="text-sm text-red-700">
              ⚠️ This table seats up to {table.capacity} people. You're only
              booking for {partySize}.
            </p>
          )}

          <div className="mt-2 flex w-full justify-end">
            <Button
              type="confirm"
              onClick={() => {
                if (time === "none") {
                  toast.error("Choose time!");
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
    </Card>
  );
}

export default Table;
