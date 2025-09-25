import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  handleGetReservationByCode,
  useUpdateReservation,
} from "../../services/apiReservation";
import { useDeleteReservation } from "../../services/apiTable";
import ReservationCard from "./ReservationCard";
import Loader from "../../ui/Loader";

//NEXT IS CODE THE RESERVATION STATUS MECHANICS
//FIX THE Monitor Reservation Component
//Create a context for ForgotCode.tsx Name, Email, Date.
//The route looks disgusting

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

  if (
    isReservationPending ||
    !reservationCode ||
    isUpdatePending ||
    isDeletePending
  )
    return <Loader />;

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
