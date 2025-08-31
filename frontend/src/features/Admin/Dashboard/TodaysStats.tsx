import { useQuery } from "@tanstack/react-query";
import { getTodaysStats } from "../../../services/apiReservation";
import Loader from "../../../ui/Loader";
import Stat from "./Stat";

export interface StatsTypes {
  status: string;
  count: number;
}

function TodaysStats() {
  const { data: todaysStats, isPending: isTodaysStatsPending } = useQuery<
    StatsTypes[]
  >({
    queryKey: ["todaysStats"],
    queryFn: getTodaysStats,
  });

  if (isTodaysStatsPending) return <Loader />;
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Today's Stats</h2>
      <div className="mx-2 grid grid-cols-2 gap-2 md:grid-cols-3">
        {todaysStats?.map((stat) => <Stat stat={stat} key={stat.status} />)}
      </div>
    </div>
  );
}

export default TodaysStats;
