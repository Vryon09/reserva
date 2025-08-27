import { useUpdateReservation } from "../../services/apiReservation";
import Loader from "../../ui/Loader";
import Reservation from "./Reservation";
import type { ReservationPayload, ReservationSectionProps } from "./types";

function ReservationSection({
  isReservationPending,
  reservations,
  reservationType,
  isTodaysReservation = false,
}: ReservationSectionProps) {
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
      <p className="text-xl font-semibold">
        <span className="capitalize">
          {!isTodaysReservation ? reservationType : "Today's"}
        </span>{" "}
        Reservation ({reservations.length})
      </p>
      {(isReservationPending || isUpdateReservationPending) && <Loader />}

      {!reservations?.length && !isReservationPending && (
        <p className="px-2">No Reservation Today😔</p>
      )}

      {!isUpdateReservationPending && (
        <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:grid-cols-3">
          {reservations?.map((reservation) => (
            <Reservation
              reservation={reservation}
              reservationType={reservationType}
              handleUpdate={handleUpdate}
              key={reservation._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReservationSection;
