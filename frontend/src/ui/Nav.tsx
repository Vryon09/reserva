import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Nav() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <Logo />

      <button
        className="cursor-pointer bg-neutral-800 px-3 py-2 text-xs font-semibold tracking-wide text-neutral-50 uppercase"
        onClick={() => navigate("/admin")}
      >
        Admin
      </button>
    </div>
  );
}

export default Nav;
