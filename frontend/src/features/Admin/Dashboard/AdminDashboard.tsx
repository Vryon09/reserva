import ReservationCountsByDay from "./ReservationCountsByDay";
import ResNextXHours from "./ResNextXHours";
import TodaysStats from "./TodaysStats";

function AdminDashboard() {
  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <TodaysStats />
          <ReservationCountsByDay />
        </div>
        <ResNextXHours />
      </div>
    </div>
  );
}

export default AdminDashboard;
