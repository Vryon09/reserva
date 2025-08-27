import ResNextXHours from "./ResNextXHours";
import TodaysStats from "./TodaysStats";

function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <TodaysStats />
      <ResNextXHours />
    </div>
  );
}

export default AdminDashboard;
