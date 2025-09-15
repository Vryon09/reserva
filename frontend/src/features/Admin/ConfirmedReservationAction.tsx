import { useState } from "react";
import { useUpdateReservationStatus } from "../../services/apiTable";
import Button from "../../ui/Button";
import type { ReservationActionProps } from "./types";
import Modal from "../../ui/Modal";

function ConfirmedReservationAction({
  reservation,
  handleUpdate,
}: ReservationActionProps) {
  const [modal, setModal] = useState<string>("");

  const { mutate: handleUpdateReservationStatus } =
    useUpdateReservationStatus();

  const now = new Date().toISOString().split("T")[0];

  function handleSubmit() {
    if (modal === "cancel") {
      handleUpdate(reservation._id, { status: "pending" });
      handleUpdateReservationStatus({
        tableId: reservation.tableId,
        reservationId: reservation._id,
        status: "pending",
      });
    }

    if (modal === "seated") {
      handleUpdate(reservation._id, { status: "seated" });
      handleUpdateReservationStatus({
        tableId: reservation.tableId,
        reservationId: reservation._id,
        status: "seated",
      });
    }

    if (modal === "done") {
      handleUpdate(reservation._id, { status: "done" });
      handleUpdateReservationStatus({
        tableId: reservation.tableId,
        reservationId: reservation._id,
        status: "done",
      });
    }

    setModal("");
  }

  return (
    <>
      {reservation.status === "confirmed" &&
        reservation.reservationDate.split("T")[0] !== now && (
          <Button type="reject" onClick={() => setModal("cancel")}>
            Cancel
          </Button>
        )}

      {reservation.status === "confirmed" &&
        reservation.reservationDate.split("T")[0] === now && (
          <Button type="confirm" onClick={() => setModal("seated")}>
            Seated
          </Button>
        )}

      {reservation.status === "seated" && (
        <Button type="confirm" onClick={() => setModal("done")}>
          Done
        </Button>
      )}

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
                  modal === "done"
                    ? "confirm"
                    : modal === "cancel"
                      ? "reject"
                      : "confirm"
                }
                onClick={handleSubmit}
              >
                <span className="capitalize">
                  {modal}
                  {modal === "cancel" && " Reservation"}
                </span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default ConfirmedReservationAction;
