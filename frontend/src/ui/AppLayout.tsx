import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function AppLayout() {
  return (
    <div className="py-3">
      <Nav />

      <div className="mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
