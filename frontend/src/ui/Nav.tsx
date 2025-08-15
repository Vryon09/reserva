import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import toast from "react-hot-toast";

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-14 items-center justify-between">
      <Logo />

      {location.pathname === "/" && (
        <Button
          type="secondary"
          onClick={() => {
            const token = localStorage.getItem("adminToken");
            console.log(location);
            if (token) {
              navigate("/admin/dashboard");
              return;
            }
            navigate("/admin/login");
          }}
        >
          Admin
        </Button>
      )}

      {location.pathname === "/admin/dashboard" && (
        <Button
          type="secondary"
          onClick={() => {
            localStorage.setItem("adminToken", "");
            toast.success("Logged out successfully.");
            navigate("/admin/login");
          }}
        >
          Logout
        </Button>
      )}
    </div>
  );
}

export default Nav;
