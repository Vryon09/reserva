import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from "../ui/AdminNav";

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
    <div className="flex">
      <AdminNav />

      <div className="w-full rounded-2xl border-t-1 border-neutral-200 p-2 md:mr-4 md:border-1 md:p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminMode;
