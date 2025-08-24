import Button from "../../ui/Button";
import type { ReservationActionProps } from "./Reservation";

function ConfirmedReservationAction({
  reservation,
  handleUpdate,
}: ReservationActionProps) {
  const now = new Date().toISOString();

  return (
    <>
      {reservation.status === "confirmed" &&
        reservation.reservationDate !== now && (
          <Button
            type="reject"
            onClick={() => handleUpdate(reservation._id, { status: "pending" })}
          >
            Cancel
          </Button>
        )}

      {reservation.status === "confirmed" &&
        reservation.reservationDate === now && (
          <Button
            type="confirm"
            onClick={() => handleUpdate(reservation._id, { status: "seated" })}
          >
            Seated
          </Button>
        )}

      {reservation.status === "seated" && (
        <Button
          type="confirm"
          onClick={() => handleUpdate(reservation._id, { status: "done" })}
        >
          Done
        </Button>
      )}
    </>
  );
}

export default ConfirmedReservationAction;
