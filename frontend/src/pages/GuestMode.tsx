import { Outlet } from "react-router-dom";

function GuestMode() {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
}

export default GuestMode;
