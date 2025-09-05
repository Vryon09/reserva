import { format } from "date-fns";
import ConfirmedReservationAction from "./ConfirmedReservationAction";
import RequestReservationAction from "./RequestReservationAction";
import Card from "../../ui/Card";
import type { ReservationProps } from "./types";

// box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

function Reservation({
  reservation,
  reservationType,
  handleUpdate,
}: ReservationProps) {
  return (
    <Card additionalStyle="min-h-48 flex flex-col justify-between">
      <div>
        <p className="font-semibold">{reservation.tableName}</p>
        <p>Code: {reservation.reservationCode}</p>
        <p>Name: {reservation.name}</p>
        <p>Phone: {reservation.phone}</p>
        <p>{format(reservation.reservationDate, "MMMM d, yyyy, h:mm a")}</p>
        <p>Status: {reservation.status}</p>
      </div>

      <div className="mt-2 flex items-center justify-between gap-4">
        {reservationType === "confirmed" && (
          <ConfirmedReservationAction
            reservation={reservation}
            handleUpdate={handleUpdate}
          />
        )}

        {reservationType === "requested" && (
          <RequestReservationAction
            reservation={reservation}
            handleUpdate={handleUpdate}
          />
        )}
      </div>
    </Card>
  );
}

export default Reservation;
