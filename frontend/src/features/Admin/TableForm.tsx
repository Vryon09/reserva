import Button from "../../ui/Button";
import type { TableInfo } from "./ManageTables";

interface TableFormProps {
  handleSubmit: () => void;
  tableInfo: TableInfo;
  setTableInfo: React.Dispatch<React.SetStateAction<TableInfo>>;
  action: string;
  handleCloseModal: () => void;
}

const tableSeatsArray = [2, 4, 6, 8, 10, 15, 20, 30, 50];

function TableForm({
  handleSubmit,
  tableInfo,
  setTableInfo,
  action,
  handleCloseModal,
}: TableFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <label>Table Name: </label>
        <input
          value={tableInfo.tableNumber}
          onChange={(e) =>
            setTableInfo((prev) => {
              return { ...prev, tableNumber: e.target.value };
            })
          }
          type="text"
          className="border-1"
        />
      </div>

      <div>
        <label>Notes: </label>
        <input
          value={tableInfo.notes}
          onChange={(e) =>
            setTableInfo((prev) => {
              return { ...prev, notes: e.target.value };
            })
          }
          type="text"
          className="border-1"
        />
      </div>

      <div>
        <label>Capacity: </label>
        <select
          className="w-full border-1"
          value={tableInfo.capacity}
          onChange={(e) =>
            setTableInfo((prev) => {
              return { ...prev, capacity: +e.target.value };
            })
          }
        >
          <option value="0">No. of seats</option>
          {tableSeatsArray.map((seatCapacity) => (
            <option key={seatCapacity} value={`${seatCapacity}`}>
              {seatCapacity}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="neutral"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            handleCloseModal();
          }}
        >
          Cancel
        </Button>
        <Button type="confirm">{action}</Button>
      </div>
    </form>
  );
}

export default TableForm;
