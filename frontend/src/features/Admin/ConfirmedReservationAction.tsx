import Button from "../../ui/Button";
import type { ReservationActionProps } from "./Reservation";

function ConfirmedReservationAction({
  reservation,
  handleUpdate,
}: ReservationActionProps) {
  return (
    <>
      {reservation.status === "confirmed" && (
        <Button
          type="reject"
          onClick={() => handleUpdate(reservation._id, { status: "pending" })}
        >
          Cancel
        </Button>
      )}

      {reservation.status === "confirmed" && (
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
