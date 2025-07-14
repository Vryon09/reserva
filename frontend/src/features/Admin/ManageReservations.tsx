import { useQuery } from "@tanstack/react-query";
import { getAllReservation } from "../../services/apiReservation";
import ReservationSection from "./ReservationSection";

export interface ReservationTypes {
  _id: string;
  tableNumber: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  status: string;
  reservationCode: string;
}

// reservation request and today's reservation should be in different section

function ManageReservations() {
  const {
    data: confirmedReservations,
    isPending: isConfirmedReservationsPending,
  } = useQuery<ReservationTypes[]>({
    queryKey: ["confirmedReservations"],
    queryFn: () =>
      getAllReservation({
        queryString: "notStatus",
        status: "pending,rejected,done",
      }),
  });

  const { data: requestReservations, isPending: isRequestReservationsPending } =
    useQuery<ReservationTypes[]>({
      queryKey: ["reservations"],
      queryFn: () =>
        getAllReservation({ queryString: "status", status: "pending" }),
    });

  return (
    <div className="space-y-4">
      <ReservationSection
        isReservationPending={isConfirmedReservationsPending}
        reservations={confirmedReservations ?? []}
        reservationType="confirmed"
      />

      <ReservationSection
        isReservationPending={isRequestReservationsPending}
        reservations={requestReservations ?? []}
        reservationType="request"
      />
    </div>
  );
}

export default ManageReservations;
