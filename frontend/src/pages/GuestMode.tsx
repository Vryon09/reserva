import { Outlet } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";

function GuestMode() {
  useSocket();

  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
}

export default GuestMode;
