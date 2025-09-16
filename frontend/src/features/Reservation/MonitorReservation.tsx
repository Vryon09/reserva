import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleGetReservationByCode,
  useUpdateReservation,
} from "../../services/apiReservation";
import { useDeleteReservation } from "../../services/apiTable";
import ReservationCard from "./ReservationCard";
import Loader from "../../ui/Loader";
import Button from "../../ui/Button";
import type { ReservationTypes } from "../Admin/types";
import Card from "../../ui/Card";

//NEXT IS CODE THE RESERVATION STATUS MECHANICS
//FIX THE Monitor Reservation Component

function MonitorReservation() {
  const { reservationCode } = useParams();

  const {
    data: reservation,
    isPending: isReservationPending,
    isError,
  } = useQuery({
    queryKey: ["monitorReservation", reservationCode],
    queryFn: handleGetReservationByCode,
  });

  const { mutate: handleUpdateReservation, isPending: isUpdatePending } =
    useUpdateReservation();

  const { mutate: handleDeleteReservation, isPending: isDeletePending } =
    useDeleteReservation();

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
      <Card additionalStyle="m-auto max-w-[400px] space-y-2">
        <p className="text-lg">No reservation found🥲</p>
        <div className="flex w-full justify-end">
          <Button onClick={() => navigate("/")} type="neutral">
            Go to home
          </Button>
        </div>
      </Card>
    );

  if (reservationCode.length > 4)
    return (
      <div className="space-y-4">
        <p className="mb-4 text-2xl font-bold">Search Results</p>
        <div className="mx-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                handleDeleteReservation({
                  tableId: res.tableId,
                  reservationId: res._id,
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
        handleDeleteReservation({
          tableId: reservation.tableId,
          reservationId: reservation._id,
        });
      }}
    />
  );
}

export default MonitorReservation;
