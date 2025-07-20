import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";

function Nav() {
  const navigate = useNavigate();

  return (
    <div className="items-cen ter flex h-14 justify-between">
      <Logo />

      <Button type="secondary" onClick={() => navigate("/admin")}>
        Admin
      </Button>
    </div>
  );
}

export default Nav;
