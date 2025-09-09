import { useQuery } from "@tanstack/react-query";
import { getTodaysStats } from "../../../services/apiReservation";
import Stat from "./Stat";
import Card from "../../../ui/Card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold">Today's Stats</h2>
      <div className="mx-2 grid grid-cols-2 gap-2 xl:grid-cols-3">
        {isTodaysStatsPending
          ? Array.from({ length: 5 }, (_, i) => (
              <Skeleton
                height={86}
                borderRadius={12}
                baseColor="#d4d4d4"
                key={i}
              />
            ))
          : todaysStats?.map((stat) => <Stat stat={stat} key={stat.status} />)}
      </div>
    </Card>
  );
}

export default TodaysStats;
