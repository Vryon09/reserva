import {
  useUpdateReservation,
  type ReservationPayload,
} from "../../services/apiReservation";
import Loader from "../../ui/Loader";
import type { ReservationTypes } from "./ManageReservations";
import Reservation from "./Reservation";

interface ReservationSectionProps {
  isReservationPending: boolean;
  reservations: ReservationTypes[];
  reservationType: string;
}

function ReservationSection({
  isReservationPending,
  reservations,
  reservationType,
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
        <span className="capitalize">{reservationType}</span> Reservation (
        {reservations.length})
      </p>
      {(isReservationPending || isUpdateReservationPending) && <Loader />}

      {!reservations?.length && !isReservationPending && (
        <p className="px-4">No Reservation Today😔</p>
      )}

      {!isUpdateReservationPending && (
        <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 md:grid-cols-3">
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
