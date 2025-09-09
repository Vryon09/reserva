// import { tables } from "../../testdata";
import { useQuery } from "@tanstack/react-query";
import { getAllTables } from "../../services/apiTable";
import { useReservationForm } from "../../contexts/useReservationForm";
import { useEffect, useState } from "react";
import Table from "./Table";
// import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface TableTypes {
  _id: string;
  tableName: string;
  capacity: number;
  notes: string;
  status: string;
  reservations: {
    reservationDate: string;
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

  // if (isTablesPending) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold sm:px-2">Choose Table</p>
      <div className="grid grid-cols-2 gap-4 sm:px-4 md:grid-cols-4 lg:grid-cols-6">
        {isTablesPending
          ? Array.from({ length: 6 }, (_, i) => (
              <Skeleton
                height={160}
                borderRadius={12}
                key={i}
                baseColor="#d4d4d4"
              />
            ))
          : tables?.map((table) => (
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
