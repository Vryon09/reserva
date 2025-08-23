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
    <div className="flex px-2">
      <AdminNav />

      <div className="w-full rounded-2xl bg-neutral-100 px-4 py-8 md:mx-4 md:px-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminMode;
