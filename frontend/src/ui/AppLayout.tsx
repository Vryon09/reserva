import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function AppLayout() {
  return (
    <div className="px-4 py-3">
      <Nav />

      <div className="mx-auto px-1">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
