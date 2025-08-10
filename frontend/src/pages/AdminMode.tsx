import { useEffect } from "react";
import ManageReservations from "../features/Admin/ManageReservations";
import ManageTables from "../features/Admin/ManageTables";
import { useNavigate } from "react-router-dom";

function AdminMode() {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDashboard() {
      const token = localStorage.getItem("adminToken");
      if (!token) return navigate("/admin/login");
    }

    fetchDashboard();
  }, [navigate]);

  return (
    <div className="space-y-8">
      <ManageReservations />

      <ManageTables />
    </div>
  );
}

export default AdminMode;
