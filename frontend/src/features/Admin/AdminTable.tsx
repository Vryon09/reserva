import Button from "../../ui/Button";
import Card from "../../ui/Card";
import type { Table } from "./types";

type AdminTableTypes = {
  table: Table;
  onEdit: () => void;
  onDelete: () => void;
};

function AdminTable({ table, onEdit, onDelete }: AdminTableTypes) {
  return (
    <Card
      key={table._id}
      additionalStyle="cursor-pointer gap-1 flex flex-col items-baseline min-h-40 justify-between"
    >
      <div className="gap-1">
        <p className="text-sm font-semibold">{table.tableName}</p>
        <p className="text-sm">{table.notes}</p>
        <p className="text-sm">Capacity: {table.capacity}</p>
      </div>

      <div className="mt-2 flex w-full items-center justify-between gap-4">
        <Button type="confirm" onClick={onEdit}>
          Edit
        </Button>

        <Button type="reject" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default AdminTable;
