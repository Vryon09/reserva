import { useQuery } from "@tanstack/react-query";
import { getReservationCountsByDay } from "../../../services/apiReservation";
import { LineChart } from "@mui/x-charts";
import Loader from "../../../ui/Loader";
import { useState } from "react";

interface ReservationCountsByDayType {
  _id: string;
  reservationDates: number;
}

function ReservationCountsByDay() {
  const [status, setStatus] = useState("all");
  const {
    data: reservationCountsByDay,
    isPending: isReservationCountsByDayPending,
  } = useQuery<ReservationCountsByDayType[]>({
    queryKey: ["reservationEachDay", status],
    queryFn: () => getReservationCountsByDay({ status: status }),
  });

  if (isReservationCountsByDayPending) return <Loader />;
  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold">Reservation Counts By Day</h2>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className=""
        >
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
          <option value="seated">Seated</option>
          <option value="done">Done</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="h-60 w-full">
        <LineChart
          xAxis={[
            {
              scaleType: "band",
              data: reservationCountsByDay?.map((day) => day._id),
            },
          ]}
          series={[
            {
              data: reservationCountsByDay?.map((day) => day.reservationDates),
              area: true,
              color: "#39ff14",
            },
          ]}
          grid={{ vertical: true, horizontal: true }}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export default ReservationCountsByDay;
