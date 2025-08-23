import { useQuery } from "@tanstack/react-query";
import { getTodaysReservation } from "../../services/apiReservation";
import type { ReservationResponseTypes } from "./ManageReservations";
import ReservationSection from "./ReservationSection";

function AdminDashboard() {
  const {
    data: { reservations: todaysReservation } = {
      reservations: [],
    },
    isPending: isTodaysReservationPending,
  } = useQuery<ReservationResponseTypes>({
    queryKey: ["todaysReservation"],
    queryFn: () =>
      getTodaysReservation({
        status: "confirmed",
        limit: 0,
        page: 0,
      }),
  });

  return (
    <div>
      <ReservationSection
        isReservationPending={isTodaysReservationPending}
        reservations={todaysReservation ?? []}
        reservationType="confirmed"
        isTodaysReservation={true}
      />
    </div>
  );
}

export default AdminDashboard;
