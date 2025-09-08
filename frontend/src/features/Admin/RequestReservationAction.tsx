import { useUpdateReservationStatus } from "../../services/apiTable";
import Button from "../../ui/Button";
import type { ReservationActionProps } from "./types";

function RequestReservationAction({
  reservation,
  handleUpdate,
}: ReservationActionProps) {
  const { mutate: handleUpdateReservationStatus } =
    useUpdateReservationStatus();
  return (
    <>
      <Button
        type="reject"
        onClick={() => {
          handleUpdate(reservation._id, { status: "rejected" });
          handleUpdateReservationStatus({
            tableId: reservation.tableId,
            reservationId: reservation._id,
            status: "rejected",
          });
        }}
      >
        Reject
      </Button>

      <Button
        type="confirm"
        onClick={() => {
          handleUpdate(reservation._id, { status: "confirmed" });
          handleUpdateReservationStatus({
            tableId: reservation.tableId,
            reservationId: reservation._id,
            status: "confirmed",
          });
        }}
      >
        Confirm
      </Button>
    </>
  );
}

export default RequestReservationAction;
