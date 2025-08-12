// import { tables } from "../../testdata";
import { useQuery } from "@tanstack/react-query";
import { getAllTables } from "../../services/apiTable";
import { useReservationForm } from "../../contexts/useReservationForm";
import { useEffect, useState } from "react";
import Table from "./Table";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  useEffect(() => {
    if (partySize === "none") {
      navigate("/");
    }
  }, [navigate, partySize]);

  const { data: tables, isPending: isTablesPending } = useQuery<TableTypes[]>({
    queryFn: () =>
      getAllTables({
        queryString: "partySize",
        value: partySize,
      }),
    queryKey: ["tables", partySize],
  });

  if (isTablesPending) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold sm:px-2">Choose Table</p>
      <div className="grid grid-cols-2 gap-2 sm:px-4 md:grid-cols-4 lg:grid-cols-6">
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
