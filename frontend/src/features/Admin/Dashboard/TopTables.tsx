import { useQuery } from "@tanstack/react-query";
import { getTopTables } from "../../../services/apiTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "../../../ui/Card";

interface TopTablesTypes {
  _id: string;
  tableName: string;
  reservationCount: number;
}

function TopTables() {
  const { data: topTables = [], isPending } = useQuery<TopTablesTypes[]>({
    queryKey: ["topTables"],
    queryFn: getTopTables,
  });
  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold">Top Tables</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {isPending
          ? Array.from({ length: 3 }, (_, i) => (
              <Skeleton
                baseColor="#d4d4d4"
                borderRadius={12}
                key={i}
                height={86}
              />
            ))
          : topTables.map((table, i) => (
              <div
                style={{
                  backgroundColor:
                    i === 0
                      ? "#FFB700"
                      : i === 1
                        ? "#708090"
                        : i === 2
                          ? "#cd7f32"
                          : "black",
                }}
                key={table._id}
                className="card-form w-full text-white capitalize"
              >
                <p className="text-sm md:text-base">{table.tableName}</p>
                <p className="text-2xl font-semibold md:text-3xl">
                  {table.reservationCount}
                </p>
              </div>
            ))}
      </div>
    </Card>
  );
}

export default TopTables;
