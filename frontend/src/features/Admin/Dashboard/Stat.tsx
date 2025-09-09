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
                    : stat.status === "cancelled"
                      ? "oklch(79.5% 0.184 86.047)" // orange-500
                      : "#ffffff", // default (white)
      }}
    >
      <p className="text-sm md:text-base">{stat.status}</p>
      <p className="text-2xl font-semibold md:text-3xl">{stat.count}</p>
    </div>
  );
}

export default Stat;
