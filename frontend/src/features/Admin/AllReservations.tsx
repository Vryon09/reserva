import { useQuery } from "@tanstack/react-query";
import {
  getAllReservation,
  useUpdateReservation,
  type ReservationPayload,
} from "../../services/apiReservation";
import type { ReservationTypes } from "./ManageReservations";
import Reservation from "./Reservation";

function AllReservations() {
  const { data: allReservations, isPending: isReservationsPending } = useQuery<
    ReservationTypes[]
  >({
    queryKey: ["allReservations"],
    queryFn: () =>
      getAllReservation({
        queryString: "status",
        status: "all",
      }),
  });

  const {
    mutate: handleUpdateReservation,
    isPending: isUpdateReservationPending,
  } = useUpdateReservation();

  function handleUpdate(
    id: string,
    updatedReservation: Partial<ReservationPayload>,
  ) {
    handleUpdateReservation({ id, updatedReservation });
  }

  return (
    <div className="space-y-4">
      <p className="text-xl font-semibold">All Reservations</p>

      {isReservationsPending ||
        (isUpdateReservationPending && <p>Loading...</p>)}

      {!allReservations?.length ? (
        <p>No Reservation Today😔</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {allReservations?.map((reservation) => (
            <Reservation
              reservation={reservation}
              reservationType={"all"}
              handleUpdate={handleUpdate}
              key={reservation._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllReservations;
