import { useQuery } from "@tanstack/react-query";
import {
  getAllReservation,
  useUpdateReservation,
  type ReservationPayload,
} from "../../services/apiReservation";
import Reservation from "./Reservation";
import { useState } from "react";
import type { ReservationResponseTypes } from "./ManageReservations";
import Loader from "../../ui/Loader";
import Pagination from "../../ui/Pagination";

function AllReservations() {
  const [page, setPage] = useState(1);
  const limit = 6;

  const {
    data: { reservations: allReservations, total } = {
      reservations: [],
      total: 0,
    },
    isPending: isReservationsPending,
  } = useQuery<ReservationResponseTypes>({
    queryKey: ["allReservations", page],
    queryFn: () =>
      getAllReservation({
        queryString: "status",
        status: "all",
        limit,
        page,
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

      {(isReservationsPending || isUpdateReservationPending) && <Loader />}

      {!allReservations?.length && !isReservationsPending ? (
        <p>No Reservation Today😔</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
      {!isReservationsPending && (
        <Pagination
          pages={Math.ceil(total / 6)}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default AllReservations;
