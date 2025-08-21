import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import toast from "react-hot-toast";
import { Menu } from "lucide-react";
import { useState } from "react";
import AdminDrawer from "./AdminDrawer";

function Nav() {
  const [isAdminNavOpen, setIsAdminNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-16 items-center justify-between px-4">
      <Logo />

      {location.pathname === "/" && (
        <Button
          type="secondary"
          onClick={() => {
            const token = localStorage.getItem("adminToken");
            if (token) {
              navigate("/admin/dashboard");
              return;
            }
            navigate("/admin-login");
          }}
        >
          Admin
        </Button>
      )}

      {location.pathname === "/admin/dashboard" && (
        <>
          <button
            className="cursor-pointer md:hidden"
            onClick={() => {
              setIsAdminNavOpen(true);
            }}
          >
            <Menu size={30} color="#c57b57" />
          </button>

          <div className="hidden md:block">
            <Button
              type="secondary"
              onClick={() => {
                localStorage.setItem("adminToken", "");
                toast.success("Logged out successfully.");
                navigate("/admin-login");
              }}
            >
              Logout
            </Button>
          </div>
        </>
      )}

      <AdminDrawer
        isAdminNavOpen={isAdminNavOpen}
        setIsAdminNavOpen={setIsAdminNavOpen}
      />
    </div>
  );
}

export default Nav;
