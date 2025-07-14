import type { ReservationActionProps } from "./Reservation";

function RequestReservationAction({
  reservation,
  handleUpdate,
}: ReservationActionProps) {
  return (
    <>
      <button
        className="mt-2 cursor-pointer bg-red-600 p-2 text-white"
        onClick={() => handleUpdate(reservation._id, { status: "rejected" })}
      >
        Reject
      </button>

      <button
        className="mt-2 cursor-pointer bg-green-500 p-2"
        onClick={() => handleUpdate(reservation._id, { status: "confirmed" })}
      >
        Confirm
      </button>
    </>
  );
}

export default RequestReservationAction;
