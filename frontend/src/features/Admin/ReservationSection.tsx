import {
  useUpdateReservation,
  type ReservationPayload,
} from "../../services/apiReservation";
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
      <p className="text-xl font-semibold">Confirmed Reservation</p>

      {isReservationPending ||
        (isUpdateReservationPending && <p>Loading...</p>)}

      {!reservations?.length ? (
        <p>No Reservation Today😔</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
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
