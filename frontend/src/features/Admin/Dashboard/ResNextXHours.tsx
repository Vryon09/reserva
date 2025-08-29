import { useQuery } from "@tanstack/react-query";
import { getResNextXHrs } from "../../../services/apiReservation";
import type { ReservationResponseTypes } from "../types";
import Loader from "../../../ui/Loader";
import { format } from "date-fns";

function ResNextXHours() {
  const {
    data: { reservations, total } = { reservations: [], total: 0 },
    isPending: isReservationsPending,
  } = useQuery<ReservationResponseTypes>({
    queryKey: ["resNextXHours"],
    queryFn: () => getResNextXHrs({ hours: 4 }),
  });

  if (isReservationsPending) return <Loader />;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">
        Arriving in the next 3 hours
      </h2>
      {total > 0 && (
        <div className="border-1 border-b-0">
          {reservations?.map((reservation) => (
            <div key={reservation._id} className="grid grid-cols-4 border-b-1">
              <p className="border-r-1 p-2 text-sm">
                {format(reservation.reservationDate, "h:mm a")}
              </p>
              <p className="col-span-2 border-r-1 p-2 text-sm">
                {reservation.name}
              </p>
              <p className="p-2 text-sm">{reservation.tableName}</p>
            </div>
          ))}
        </div>
      )}
      {!total && (
        <p className="text-sm">No one will arrive in the next 3 hours😥</p>
      )}
    </div>
  );
}

export default ResNextXHours;
