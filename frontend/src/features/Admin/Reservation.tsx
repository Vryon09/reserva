import { format } from "date-fns";
import type { ReservationTypes } from "./ManageReservations";
import ConfirmedReservationAction from "./ConfirmedReservationAction";
import RequestReservationAction from "./RequestReservationAction";
import type { ReservationPayload } from "../../services/apiReservation";

interface ReservationProps {
  reservation: ReservationTypes;
  reservationType: string;
  handleUpdate: (
    id: string,
    updatedReservation: Partial<ReservationPayload>,
  ) => void;
}

export interface ReservationActionProps {
  reservation: ReservationTypes;
  handleUpdate: (
    id: string,
    updatedReservation: Partial<ReservationPayload>,
  ) => void;
}

function Reservation({
  reservation,
  reservationType,
  handleUpdate,
}: ReservationProps) {
  return (
    <div className="border-1 p-3">
      <p className="font-semibold">{reservation.tableNumber}</p>
      <p>Reservation Code: {reservation.reservationCode}</p>
      <p>Name: {reservation.name}</p>
      <p>Phone: {reservation.phone}</p>
      <p>
        {format(
          `${reservation.date} ${reservation.time}`,
          "MMMM d, yyyy, h:mm a",
        )}
      </p>
      <p>Status: {reservation.status}</p>

      <div className="flex justify-between">
        {reservationType === "confirmed" && (
          <ConfirmedReservationAction
            reservation={reservation}
            handleUpdate={handleUpdate}
          />
        )}

        {reservationType === "request" && (
          <RequestReservationAction
            reservation={reservation}
            handleUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default Reservation;
