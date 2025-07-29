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
      <p className="text-xl font-semibold">
        <span className="capitalize">{reservationType}</span> Reservation
      </p>
      {(isReservationPending || isUpdateReservationPending) && (
        <div className="flex w-full items-center justify-center">
          <div className="loader"></div>
        </div>
      )}

      {!reservations?.length && !isReservationPending && (
        <p>No Reservation Today😔</p>
      )}

      {!isUpdateReservationPending && (
        <div className="grid grid-cols-2 gap-4">
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
