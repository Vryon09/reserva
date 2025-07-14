import type { ReservationActionProps } from "./Reservation";

function ConfirmedReservationAction({
  reservation,
  handleUpdate,
}: ReservationActionProps) {
  return (
    <>
      {reservation.status === "confirmed" && (
        <button
          className="mt-2 cursor-pointer bg-red-600 p-2 text-white"
          onClick={() => handleUpdate(reservation._id, { status: "pending" })}
        >
          Cancel
        </button>
      )}

      {reservation.status === "confirmed" && (
        <button
          className="mt-2 cursor-pointer bg-green-500 p-2"
          onClick={() => handleUpdate(reservation._id, { status: "seated" })}
        >
          Mark as seated
        </button>
      )}

      {reservation.status === "seated" && (
        <button
          className="mt-2 cursor-pointer bg-green-500 p-2"
          onClick={() => handleUpdate(reservation._id, { status: "done" })}
        >
          Done
        </button>
      )}
    </>
  );
}

export default ConfirmedReservationAction;
