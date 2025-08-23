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

      <div className="w-full p-4 md:mx-4 md:rounded-2xl md:border-1 md:border-neutral-200 md:p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminMode;
