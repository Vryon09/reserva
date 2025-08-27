import { getAllTables } from "../../services/apiTable";
import { useQuery } from "@tanstack/react-query";
import AddTableButton from "./AddTableButton";
import AdminTables from "./AdminTables";
import Loader from "../../ui/Loader";
import type { Table } from "./types";

function ManageTables() {
  const { data: tables, isPending: isTablesPending } = useQuery<Table[]>({
    queryKey: ["tables"],
    queryFn: () => getAllTables({ queryString: "partySize", value: "0" }),
  });

  return (
    <div className="space-y-4">
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
