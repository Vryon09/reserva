import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import toast from "react-hot-toast";
import { LogOut, Menu, UserLock } from "lucide-react";
import { useState } from "react";
import AdminDrawer from "./AdminDrawer";
import { getToken } from "../services/helperFunctions";

function Nav() {
  const [isAdminNavOpen, setIsAdminNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-24 items-center justify-between px-4 md:px-8">
      <Logo />

      {location.pathname === "/" && (
        <Button
          type="secondary"
          onClick={() => {
            const token = getToken();
            if (token) {
              navigate("/admin/dashboard");
              return;
            }
            navigate("/admin-login");
          }}
        >
          <UserLock />
        </Button>
      )}

      {location.pathname.startsWith("/admin/") && (
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
              <LogOut />
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
