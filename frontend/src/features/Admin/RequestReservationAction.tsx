import Button from "../../ui/Button";
import type { ReservationActionProps } from "./Reservation";

function RequestReservationAction({
  reservation,
  handleUpdate,
}: ReservationActionProps) {
  return (
    <>
      <Button
        type="reject"
        onClick={() => handleUpdate(reservation._id, { status: "rejected" })}
      >
        Reject
      </Button>

      <Button
        type="confirm"
        onClick={() => handleUpdate(reservation._id, { status: "confirmed" })}
      >
        Confirm
      </Button>
    </>
  );
}

export default RequestReservationAction;
