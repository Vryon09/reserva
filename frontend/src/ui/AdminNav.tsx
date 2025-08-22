import {
  HandPlatter,
  LayoutDashboard,
  RectangleHorizontal,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function AdminNav() {
  return (
    <div className="hidden h-fit min-w-46 py-2 md:block">
      <ul className="">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-brand-500 flex cursor-pointer gap-2 border-l-2 py-2 pl-2"
              : "flex cursor-pointer gap-2 border-l-2 border-transparent py-2 pl-2 text-neutral-500"
          }
        >
          <LayoutDashboard size={24} /> Dashboard
        </NavLink>

        <NavLink
          to="/admin/reservations"
          className={({ isActive }) =>
            isActive
              ? "text-brand-500 flex cursor-pointer gap-2 border-l-2 py-2 pl-2"
              : "flex cursor-pointer gap-2 border-l-2 border-transparent py-2 pl-2 text-neutral-500"
          }
        >
          <HandPlatter size={24} /> Reservations
        </NavLink>

        <NavLink
          to="/admin/tables"
          className={({ isActive }) =>
            isActive
              ? "text-brand-500 flex cursor-pointer gap-2 border-l-2 py-2 pl-2"
              : "flex cursor-pointer gap-2 border-l-2 border-transparent py-2 pl-2 text-neutral-500"
          }
        >
          <RectangleHorizontal size={24} /> Tables
        </NavLink>
      </ul>
    </div>
  );
}

export default AdminNav;
