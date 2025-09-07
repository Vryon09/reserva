import { useQuery } from "@tanstack/react-query";
import { getReservationCountsByDay } from "../../../services/apiReservation";
import { LineChart } from "@mui/x-charts";
import Loader from "../../../ui/Loader";
import { useState } from "react";
import Card from "../../../ui/Card";

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
    <Card>
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold">Reservation Counts By Day</h2>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border-1 px-2 text-sm font-semibold"
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
              data: reservationCountsByDay?.map((day) => day._id.slice(0, 3)),
            },
          ]}
          series={[
            {
              data: reservationCountsByDay?.map((day) => day.reservationDates),
              area: true,
              color: "rgb(59, 131, 246, 0.3)",
            },
          ]}
          grid={{ vertical: true, horizontal: true }}
          className="h-full w-full"
        />
      </div>
    </Card>
  );
}

export default ReservationCountsByDay;
