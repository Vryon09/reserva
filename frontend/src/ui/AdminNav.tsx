import {
  HandPlatter,
  LayoutDashboard,
  RectangleHorizontal,
} from "lucide-react";
import { NavLink } from "react-router-dom";
//add border left

function AdminNav() {
  return (
    <div className="hidden p-2 md:block">
      <ul className="">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-brand-500 border-l-brand-500 flex cursor-pointer gap-2 border-l-2 py-2 pl-2"
              : "flex cursor-pointer gap-2 py-2 text-neutral-500"
          }
        >
          <LayoutDashboard /> Dashboard
        </NavLink>

        <NavLink
          to="/admin/reservations"
          className={({ isActive }) =>
            isActive
              ? "text-brand-500 border-l-brand-500 flex cursor-pointer gap-2 border-l-2 py-2 pl-2"
              : "flex cursor-pointer gap-2 py-2 text-neutral-500"
          }
        >
          <HandPlatter /> Reservations
        </NavLink>

        <NavLink
          to="/admin/tables"
          className={({ isActive }) =>
            isActive
              ? "text-brand-500 border-l-brand-500 flex cursor-pointer gap-2 border-l-2 py-2 pl-2"
              : "flex cursor-pointer gap-2 py-2 text-neutral-500"
          }
        >
          <RectangleHorizontal /> Tables
        </NavLink>
      </ul>
    </div>
  );
}

export default AdminNav;
