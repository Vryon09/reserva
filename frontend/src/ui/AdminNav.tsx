import {
  HandPlatter,
  LayoutDashboard,
  RectangleHorizontal,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function AdminNav() {
  return (
    <div className="hidden h-fit w-50 py-2 md:block">
      <ul>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "mx-2 flex cursor-pointer gap-2 rounded border-1 border-transparent bg-stone-50 px-4 py-1 text-neutral-600 shadow-[0_0_4px_rgba(0,0,0,0.2)]"
              : "mx-2 flex cursor-pointer gap-2 rounded border-1 border-transparent px-4 py-1 text-neutral-400"
          }
        >
          <LayoutDashboard size={24} /> Dashboard
        </NavLink>

        <NavLink
          to="/admin/reservations"
          className={({ isActive }) =>
            isActive
              ? "mx-2 flex cursor-pointer gap-2 rounded border-1 border-transparent bg-stone-50 px-4 py-1 text-neutral-600 shadow-[0_0_4px_rgba(0,0,0,0.2)]"
              : "mx-2 flex cursor-pointer gap-2 rounded border-1 border-transparent px-4 py-1 text-neutral-400"
          }
        >
          <HandPlatter size={24} /> Reservations
        </NavLink>

        <NavLink
          to="/admin/tables"
          className={({ isActive }) =>
            isActive
              ? "mx-2 flex cursor-pointer gap-2 rounded border-1 border-transparent bg-stone-50 px-4 py-1 text-neutral-600 shadow-[0_0_4px_rgba(0,0,0,0.2)]"
              : "mx-2 flex cursor-pointer gap-2 rounded border-1 border-transparent px-4 py-1 text-neutral-400"
          }
        >
          <RectangleHorizontal size={24} /> Tables
        </NavLink>
      </ul>
    </div>
  );
}

export default AdminNav;
