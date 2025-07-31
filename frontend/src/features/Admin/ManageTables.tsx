import { getAllTables } from "../../services/apiTable";
import { useQuery } from "@tanstack/react-query";
import AddTableButton from "./AddTableButton";
import AdminTables from "./AdminTables";
import Loader from "../../ui/Loader";

export interface Table {
  tableNumber: string;
  capacity: number;
  notes: string;
  status: string;
  _id: string;
}

export interface TableInfo {
  tableNumber: string;
  capacity: number;
  notes: string;
}

function ManageTables() {
  const { data: tables, isPending: isTablesPending } = useQuery<Table[]>({
    queryKey: ["tables"],
    queryFn: () => getAllTables({ queryString: "partySize", value: "0" }),
  });

  return (
    <div className="space-y-4">
      <p className="text-xl font-semibold">Tables</p>
      <AddTableButton />

      {isTablesPending ? (
        <Loader />
      ) : !tables?.length ? (
        <p>No Tables</p>
      ) : (
        <AdminTables tables={tables} />
      )}
    </div>
  );
}

export default ManageTables;
