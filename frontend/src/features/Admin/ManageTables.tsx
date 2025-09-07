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
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Tables</h2>

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
    </div>
  );
}

export default ManageTables;
