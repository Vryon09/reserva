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
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex flex-col justify-between gap-1">
        <label className="">Table Name: </label>
        <input
          placeholder="Enter table name"
          className="input-normal w-full"
          value={tableInfo.tableNumber}
          onChange={(e) =>
            setTableInfo((prev) => {
              return { ...prev, tableNumber: e.target.value };
            })
          }
          type="text"
        />
      </div>

      <div className="flex flex-col justify-between gap-1">
        <label className="">Notes: </label>
        <input
          placeholder="Enter notes or description"
          value={tableInfo.notes}
          onChange={(e) =>
            setTableInfo((prev) => {
              return { ...prev, notes: e.target.value };
            })
          }
          type="text"
          className="input-normal w-full"
        />
      </div>

      <div className="flex flex-col justify-between gap-1">
        <label className="">Capacity:</label>
        <select
          className="input-normal w-full"
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

      <div className="mt-2 flex items-center justify-between">
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
