import { useQuery } from "@tanstack/react-query";
import {
  getAllReservation,
  useUpdateReservation,
  type ReservationPayload,
} from "../../services/apiReservation";
import Reservation from "./Reservation";
import Button from "../../ui/Button";
import { useState } from "react";
import type { ReservationResponseTypes } from "./ManageReservations";

function AllReservations() {
  const [limit, setLimit] = useState(4);

  const {
    data: { reservations: allReservations, total } = {
      reservations: [],
      total: 0,
    },
    isPending: isReservationsPending,
  } = useQuery<ReservationResponseTypes>({
    queryKey: ["allReservations", limit],
    queryFn: () =>
      getAllReservation({
        queryString: "status",
        status: "all",
        limit: limit,
      }),
  });

  const {
    mutate: handleUpdateReservation,
    isPending: isUpdateReservationPending,
  } = useUpdateReservation();

  function handleUpdate(
    id: string,
    updatedReservation: Partial<ReservationPayload>,
  ) {
    handleUpdateReservation({ id, updatedReservation });
  }

  return (
    <div className="space-y-4">
      <p className="text-xl font-semibold">All Reservations</p>

      {isReservationsPending ||
        (isUpdateReservationPending && <p>Loading...</p>)}

      {!allReservations?.length ? (
        <p>No Reservation Today😔</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {allReservations?.map((reservation) => (
            <Reservation
              reservation={reservation}
              reservationType={"all"}
              handleUpdate={handleUpdate}
              key={reservation._id}
            />
          ))}
        </div>
      )}
      {limit < total && (
        <div className="flex justify-center">
          <Button
            onClick={() => setLimit((limit) => limit + 4)}
            type="confirmXl"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

export default AllReservations;
