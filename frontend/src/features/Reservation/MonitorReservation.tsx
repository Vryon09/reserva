import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleGetReservationByCode,
  useUpdateReservation,
} from "../../services/apiReservation";
import { useDeleteReservationInTable } from "../../services/apiTable";
import ReservationCard from "./ReservationCard";
import Loader from "../../ui/Loader";
import type { ReservationTypes } from "../Admin/ManageReservations";
import Button from "../../ui/Button";

//NEXT IS CODE THE RESERVATION STATUS MECHANICS

function MonitorReservation() {
  const { reservationCode } = useParams();

  const {
    data: reservation,
    isPending: isReservationPending,
    isError,
  } = useQuery({
    queryKey: ["data", reservationCode],
    queryFn: handleGetReservationByCode,
  });

  const { mutate: handleUpdateReservation, isPending: isUpdatePending } =
    useUpdateReservation();

  const { mutate: handleDeleteReservationInTable, isPending: isDeletePending } =
    useDeleteReservationInTable();

  const navigate = useNavigate();

  if (
    isReservationPending ||
    !reservationCode ||
    isUpdatePending ||
    isDeletePending
  )
    return <Loader />;

  console.log(reservation);

  if (reservationCode.length > 4 && !reservation.length)
    return (
      <div className="m-auto max-w-[400px] space-y-2">
        <p className="text-lg">No reservation found🥲</p>
        <div className="flex w-full justify-end">
          <Button onClick={() => navigate("/")} type="neutral">
            Go to home
          </Button>
        </div>
      </div>
    );

  if (reservationCode.length > 4)
    return (
      <div className="space-y-4">
        <p className="mb-4 text-2xl font-bold">Search Results</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reservation.map((res: ReservationTypes) => (
            <ReservationCard
              key={res._id}
              isReservationPending={isReservationPending}
              isError={isError}
              reservation={res}
              handleUpdateReservation={() => {
                handleUpdateReservation({
                  id: res._id,
                  updatedReservation: { status: "cancelled" },
                });
              }}
              handleDeleteReservationInTable={() => {
                handleDeleteReservationInTable({
                  tableName: res.tableNumber,
                  date: res.date.split("T")[0],
                  time: res.time,
                });
              }}
            />
          ))}
        </div>
      </div>
    );

  return (
    <ReservationCard
      isReservationPending={isReservationPending}
      isError={isError}
      reservation={reservation}
      handleUpdateReservation={() => {
        handleUpdateReservation({
          id: reservation._id,
          updatedReservation: { status: "cancelled" },
        });
      }}
      handleDeleteReservationInTable={() => {
        handleDeleteReservationInTable({
          tableName: reservation.tableNumber,
          date: reservation.date.split("T")[0],
          time: reservation.time,
        });
      }}
    />
  );
}

export default MonitorReservation;
