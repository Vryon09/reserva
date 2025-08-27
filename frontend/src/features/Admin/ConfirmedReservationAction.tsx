import Button from "../../ui/Button";
import type { ReservationActionProps } from "./types";

function ConfirmedReservationAction({
  reservation,
  handleUpdate,
}: ReservationActionProps) {
  const now = new Date().toISOString().split("T")[0];

  return (
    <>
      {reservation.status === "confirmed" &&
        reservation.reservationDate.split("T")[0] !== now && (
          <Button
            type="reject"
            onClick={() => handleUpdate(reservation._id, { status: "pending" })}
          >
            Cancel
          </Button>
        )}

      {reservation.status === "confirmed" &&
        reservation.reservationDate.split("T")[0] === now && (
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
