import { useNavigate } from "react-router-dom";
// import { tables } from "../../testdata";
import { useQuery } from "@tanstack/react-query";
import { getAllTables } from "../../services/apiTable";

interface Table {
  _id: string;
  tableNumber: string;
  capacity: number;
  notes: string;
  status: string;
}

function Tables() {
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
            className="cursor-pointer border-1 p-2"
            key={table._id}
            onClick={() => navigate(`/reserve/form/${table.tableNumber}`)}
          >
            <p>Table {table.tableNumber}</p>
            <p>{table.notes}</p>
            <p>Party Size: {table.capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tables;
