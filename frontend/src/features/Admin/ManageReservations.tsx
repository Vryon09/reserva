import { useQuery } from "@tanstack/react-query";
import {
  getAllReservation,
  useUpdateReservation,
} from "../../services/apiReservation";
import { format } from "date-fns";

interface Reservation {
  _id: string;
  tableNumber: string;
  name: string;
  phone: string;
  time: string;
  status: string;
  reservationCode: string;
}

// reservation request and today's reservation should be in different section

function ManageReservations() {
  const {
    data: confirmedReservations,
    isPending: isConfirmedReservationsPending,
  } = useQuery<Reservation[]>({
    queryKey: ["confirmedReservations"],
    queryFn: () =>
      getAllReservation({
        queryString: "notStatus",
        status: "pending,rejected,done",
      }),
  });

  const { data: reservations, isPending: isReservationsPending } = useQuery<
    Reservation[]
  >({
    queryKey: ["reservations"],
    queryFn: () =>
      getAllReservation({ queryString: "status", status: "pending" }),
  });

  const {
    mutate: handleUpdateReservation,
    isPending: isUpdateReservationPending,
  } = useUpdateReservation();

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <p className="text-xl font-semibold">Confirmed Reservation</p>

        {isConfirmedReservationsPending ||
          (isUpdateReservationPending && <p>Loading...</p>)}

        {!confirmedReservations?.length ? (
          <p>No Reservation Today😔</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {confirmedReservations?.map((reservation, i: number) => (
              <div className="border-1 p-3" key={i}>
                <p className="font-semibold">Table {reservation.tableNumber}</p>
                <p>Reservation Code: {reservation.reservationCode}</p>
                <p>Name: {reservation.name}</p>
                <p>Phone: {reservation.phone}</p>
                <p>{format(reservation.time, "MMMM d, yyyy, h:mm a")}</p>
                <p>Status: {reservation.status}</p>
                <div className="flex justify-between">
                  {reservation.status === "confirmed" && (
                    <button
                      className="mt-2 cursor-pointer bg-red-600 p-2 text-white"
                      onClick={() =>
                        handleUpdateReservation({
                          id: reservation._id,
                          updatedReservation: { status: "pending" },
                        })
                      }
                    >
                      Cancel
                    </button>
                  )}

                  {reservation.status === "confirmed" && (
                    <button
                      className="mt-2 cursor-pointer bg-green-500 p-2"
                      onClick={() =>
                        handleUpdateReservation({
                          id: reservation._id,
                          updatedReservation: { status: "seated" },
                        })
                      }
                    >
                      Mark as seated
                    </button>
                  )}

                  {reservation.status === "seated" && (
                    <button
                      className="mt-2 cursor-pointer bg-green-500 p-2"
                      onClick={() =>
                        handleUpdateReservation({
                          id: reservation._id,
                          updatedReservation: { status: "done" },
                        })
                      }
                    >
                      Done
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <p className="text-xl font-semibold">Reservation Requests</p>

        {isReservationsPending ||
          (isUpdateReservationPending && <p>Loading...</p>)}

        {!reservations?.length ? (
          <p>No Reservation Request😔</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {reservations?.map((reservation, i: number) => (
              <div className="border-1 p-3" key={i}>
                <p className="font-semibold">Table {reservation.tableNumber}</p>
                <p>Reservation Code: {reservation.reservationCode}</p>
                <p>Name: {reservation.name}</p>
                <p>Phone: {reservation.phone}</p>
                <p>{format(reservation.time, "MMMM d, yyyy, h:mm a")}</p>
                <p>Status: {reservation.status}</p>
                <div className="flex justify-between">
                  <button
                    className="mt-2 cursor-pointer bg-red-600 p-2 text-white"
                    onClick={() =>
                      handleUpdateReservation({
                        id: reservation._id,
                        updatedReservation: { status: "rejected" },
                      })
                    }
                  >
                    Reject
                  </button>

                  <button
                    className="mt-2 cursor-pointer bg-green-500 p-2"
                    onClick={() =>
                      handleUpdateReservation({
                        id: reservation._id,
                        updatedReservation: { status: "confirmed" },
                      })
                    }
                  >
                    Confirm
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageReservations;
