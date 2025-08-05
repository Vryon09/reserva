import { useQuery } from "@tanstack/react-query";
import { getAllReservation } from "../../services/apiReservation";
import ReservationSection from "./ReservationSection";
import AllReservationsButton from "./AllReservationsButton";
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

export interface ReservationResponseTypes {
  reservations: ReservationTypes[];
  total: number;
}

function ManageReservations() {
  const {
    data: { reservations: confirmedReservations } = {
      reservations: [],
    },
    isPending: isConfirmedReservationsPending,
  } = useQuery<ReservationResponseTypes>({
    queryKey: ["confirmedReservations"],
    queryFn: () =>
      getAllReservation({
        queryString: "notStatus",
        status: "pending,rejected,done,abandoned,cancelled",
        limit: 0,
        page: 0,
      }),
  });

  const {
    data: { reservations: requestReservations } = {
      reservations: [],
    },
    isPending: isRequestReservationsPending,
  } = useQuery<ReservationResponseTypes>({
    queryKey: ["requestedReservations"],
    queryFn: () =>
      getAllReservation({
        queryString: "status",
        status: "pending",
        limit: 0,
        page: 0,
      }),
  });

  return (
    <div className="space-y-4">
      <AllReservationsButton />

      <ReservationSection
        isReservationPending={isConfirmedReservationsPending}
        reservations={confirmedReservations ?? []}
        reservationType="confirmed"
      />

      <ReservationSection
        isReservationPending={isRequestReservationsPending}
        reservations={requestReservations ?? []}
        reservationType="requested"
      />
    </div>
  );
}

export default ManageReservations;
