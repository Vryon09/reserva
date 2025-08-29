import type { StatsTypes } from "./TodaysStats";

function Stat({ stat }: { stat: StatsTypes }) {
  return (
    <div
      className="card-form w-full text-white capitalize"
      style={{
        backgroundColor:
          stat.status === "confirmed"
            ? "oklch(72.3% 0.219 149.579)" // green
            : stat.status === "rejected"
              ? "oklch(57.7% 0.245 27.325)" // red
              : stat.status === "seated"
                ? "oklch(54.6% 0.245 262.881)" // blue
                : stat.status === "done"
                  ? "oklch(43.9% 0 0)" // gray
                  : stat.status === "pending"
                    ? "oklch(70.5% 0.213 47.604)" // orange (next day)
                    : "#FFFFFF", // default (white)
      }}
    >
      <p>
        {stat.status}
        {stat.status === "pending" && (
          <span className="text-xs text-orange-600">(Next Day)</span>
        )}
      </p>
      <p className="text-2xl font-semibold">{stat.count}</p>
    </div>
  );
}

export default Stat;
