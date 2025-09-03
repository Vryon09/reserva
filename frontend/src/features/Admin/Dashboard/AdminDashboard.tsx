import { LineChart } from "@mui/x-charts";
import ResNextXHours from "./ResNextXHours";
import TodaysStats from "./TodaysStats";
import { getReservationEachDay } from "../../../services/apiReservation";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../ui/Loader";

interface ReservationEachDayType {
  _id: string;
  reservationDates: number;
}

function AdminDashboard() {
  const { data: reservationEachDay, isPending: isReservationEachDayPending } =
    useQuery<ReservationEachDayType[]>({
      queryKey: ["reservationEachDay"],
      queryFn: () => getReservationEachDay({ status: "all" }),
    });

  if (isReservationEachDayPending) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-8">
      <TodaysStats />
      <ResNextXHours />
      <div className="h-60 w-full">
        <LineChart
          xAxis={[
            {
              scaleType: "band",
              data: reservationEachDay?.map((day) => day._id),
            },
          ]} // Show labels as days
          series={[
            { data: reservationEachDay?.map((day) => day.reservationDates) },
          ]} // Numeric values
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
