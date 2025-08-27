import type { StatsTypes } from "./TodaysStats";

function Stat({ stat }: { stat: StatsTypes }) {
  return (
    <div className="card-form w-full capitalize">
      <p>
        {stat.status}
        {stat.status === "pending" && (
          <span className="text-xs">(Next Day)</span>
        )}
      </p>
      <p>{stat.count}</p>
    </div>
  );
}

export default Stat;
