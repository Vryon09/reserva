import ManageReservations from "../features/Admin/ManageReservations";
import ManageTables from "../features/Admin/ManageTables";

function AdminMode() {
  return (
    <div className="space-y-4">
      <ManageReservations />

      <ManageTables />
    </div>
  );
}

export default AdminMode;
