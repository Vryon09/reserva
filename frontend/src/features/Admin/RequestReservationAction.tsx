import { useState } from "react";
import {
  useDeleteReservation,
  useUpdateReservationStatus,
} from "../../services/apiTable";
import Button from "../../ui/Button";
import type { ReservationActionProps } from "./types";
import Modal from "../../ui/Modal";

function RequestReservationAction({
  reservation,
  handleUpdate,
}: ReservationActionProps) {
  const [modal, setModal] = useState<string>("");
  const { mutate: handleUpdateReservationStatus } =
    useUpdateReservationStatus();

  const { mutate: handleDeleteReservation } = useDeleteReservation();

  function handleSubmit() {
    if (modal === "reject") {
      handleUpdate(reservation._id, { status: "rejected" });
      handleUpdateReservationStatus({
        tableId: reservation.tableId,
        reservationId: reservation._id,
        status: "rejected",
      });

      handleDeleteReservation({
        tableId: reservation.tableId,
        reservationId: reservation._id,
      });
    }

    if (modal === "confirm") {
      handleUpdate(reservation._id, { status: "confirmed" });
      handleUpdateReservationStatus({
        tableId: reservation.tableId,
        reservationId: reservation._id,
        status: "confirmed",
      });
    }

    setModal("");
  }

  return (
    <>
      <Button
        type="reject"
        onClick={() => {
          setModal("reject");
        }}
      >
        Reject
      </Button>

      <Button
        type="confirm"
        onClick={() => {
          setModal("confirm");
        }}
      >
        Confirm
      </Button>

      {modal !== "" && (
        <Modal additionalFunction={() => setModal("")}>
          <form>
            <p>Are you sure you want to {modal} this reservation?</p>
            <div className="mt-4 flex justify-between">
              <Button type="neutral" onClick={() => setModal("")}>
                Cancel
              </Button>
              <Button
                type={
                  modal === "confirm"
                    ? "confirm"
                    : modal === "reject"
                      ? "reject"
                      : "confirm"
                }
                onClick={handleSubmit}
              >
                <span className="capitalize">{modal}</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default RequestReservationAction;
