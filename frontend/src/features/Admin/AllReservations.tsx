import { useQuery } from "@tanstack/react-query";
import {
  getAllReservation,
  useUpdateReservation,
} from "../../services/apiReservation";
import Reservation from "./Reservation";
import { useState } from "react";
// import Loader from "../../ui/Loader";
import Pagination from "../../ui/Pagination";
import type { ReservationPayload, ReservationResponseTypes } from "./types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AllReservations() {
  const [page, setPage] = useState(1);
  const limit = 12;

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

  console.log(new Date());

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

      {/* {(isReservationsPending || isUpdateReservationPending) && <Loader />} */}

      {!allReservations?.length && !isReservationsPending ? (
        <p>No Reservation Today😔</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isReservationsPending || isUpdateReservationPending
            ? Array.from({ length: 6 }, (_, i) => (
                <div key={i}>
                  <Skeleton
                    height={220}
                    borderRadius={12}
                    baseColor="#d4d4d4"
                  />
                </div>
              ))
            : allReservations?.map((reservation) => (
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
          pages={Math.ceil(total / limit)}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default AllReservations;
