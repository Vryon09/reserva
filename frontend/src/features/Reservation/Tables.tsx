// import { tables } from "../../testdata";
import { useQuery } from "@tanstack/react-query";
import { getAllTables } from "../../services/apiTable";
import { useReservationForm } from "../../contexts/useReservationForm";
import { useState } from "react";
import Table from "./Table";

//CLEAN THIS SHIT

export interface TableTypes {
  _id: string;
  tableNumber: string;
  capacity: number;
  notes: string;
  status: string;
  reservations: {
    date: string;
    time: string;
  }[];
}

function Tables() {
  const [selectedTable, setSelectedTable] = useState("");
  const { partySize } = useReservationForm();

  const { data: tables, isPending: isTablesPending } = useQuery<TableTypes[]>({
    queryFn: () => getAllTables({ queryString: "partySize", value: partySize }),
    queryKey: ["tables"],
  });

  if (isTablesPending) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Choose Table</p>
      <div className="grid grid-cols-2 gap-2">
        {tables?.map((table) => (
          <Table
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            table={table}
            key={table._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Tables;
