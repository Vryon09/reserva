import { useNavigate } from "react-router-dom";
import { useReservationForm } from "../../contexts/useReservationForm";
import { generateTimeOptions } from "../../services/helperFunctions";
import type { TableTypes } from "./Tables";

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
      className="border-1 p-2"
      style={
        selectedTable === table._id ? { backgroundColor: "aquamarine" } : {}
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
        <>
          <select
            className="border-1"
            value={time}
            onChange={(e) =>
              dispatch({ type: "setTime", payload: e.target.value })
            }
          >
            <option value="none">Choose Time</option>
            {generateTimeOptions({ start: 8, end: 22, table, date }).map(
              (time) => (
                <option key={time}>{time}</option>
              ),
            )}
          </select>

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
        </>
      )}
    </div>
  );
}

export default Table;
