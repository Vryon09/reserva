import { useQuery } from "@tanstack/react-query";
import { getTableOccupancy } from "../../../services/apiTable";
import Card from "../../../ui/Card";

function TableOccupancy() {
  const {
    data: { tableCount, occupiedCount } = { tableCount: 0, occupiedCount: 0 },
  } = useQuery({
    queryKey: ["tableOccupancy"],
    queryFn: getTableOccupancy,
  });

  console.log(tableCount, occupiedCount);
  console.log();
  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold">Tables Occupancy</h2>
      <div className="h-10 w-full overflow-hidden rounded-3xl bg-neutral-400">
        <div
          style={{ width: `${(occupiedCount / tableCount) * 100}%` }}
          className="h-full w-10 rounded bg-neutral-800"
        ></div>
      </div>
      <div className="flex justify-end">
        <p className="text-lg font-semibold">
          {((occupiedCount / tableCount) * 100).toFixed(2)}%
        </p>
      </div>
    </Card>
  );
}

export default TableOccupancy;
