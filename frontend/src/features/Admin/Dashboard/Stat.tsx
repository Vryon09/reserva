import type { StatsTypes } from "./TodaysStats";

function Stat({ stat }: { stat: StatsTypes }) {
  return (
    <div
      className="card-form w-full text-white capitalize"
      style={{
        backgroundColor:
          stat.status === "confirmed"
            ? "#22c55e" // green-500
            : stat.status === "rejected"
              ? "#ef4444" // red-500
              : stat.status === "seated"
                ? "#3b82f6" // blue-500
                : stat.status === "done"
                  ? "#6b7280" // gray-500
                  : stat.status === "pending"
                    ? "#f97316" // orange-500
                    : "#ffffff", // default (white)
      }}
    >
      <p>
        {stat.status}
        {stat.status === "pending" && (
          <span className="text-xs">(Next Day)</span>
        )}
      </p>
      <p className="text-2xl font-semibold">{stat.count}</p>
    </div>
  );
}

export default Stat;
