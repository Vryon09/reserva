import ResNextXHours from "./ResNextXHours";
import TodaysStats from "./TodaysStats";

function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 gap-8">
      <TodaysStats />
      <ResNextXHours />
    </div>
  );
}

export default AdminDashboard;
