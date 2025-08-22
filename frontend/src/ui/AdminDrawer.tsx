import {
  HandPlatter,
  LayoutDashboard,
  RectangleHorizontal,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function AdminDrawer({
  isAdminNavOpen,
  setIsAdminNavOpen,
}: {
  isAdminNavOpen: boolean;
  setIsAdminNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      style={
        isAdminNavOpen
          ? { transform: "translateX(0)" }
          : { transform: "translateX(100%)" }
      }
      className="bg-brand-50 fixed inset-0 z-50 h-[100dvh] w-full px-2 py-4 transition-all duration-500 md:hidden"
    >
      <button
        onClick={() => setIsAdminNavOpen(false)}
        className="flex w-full cursor-pointer justify-end"
      >
        <X size={30} color="#c57b57" />
      </button>

      <ul className="mt-4">
        <NavLink
          onClick={() => setIsAdminNavOpen(false)}
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-brand-500 flex cursor-pointer gap-2 border-l-2 py-2 pl-2"
              : "flex cursor-pointer gap-2 border-l-2 border-transparent py-2 pl-2 text-neutral-500"
          }
        >
          <LayoutDashboard /> Dashboard
        </NavLink>

        <NavLink
          onClick={() => setIsAdminNavOpen(false)}
          to="/admin/reservations"
          className={({ isActive }) =>
            isActive
              ? "text-brand-500 flex cursor-pointer gap-2 border-l-2 py-2 pl-2"
              : "flex cursor-pointer gap-2 border-l-2 border-transparent py-2 pl-2 text-neutral-500"
          }
        >
          <HandPlatter /> Reservations
        </NavLink>

        <NavLink
          onClick={() => setIsAdminNavOpen(false)}
          to="/admin/tables"
          className={({ isActive }) =>
            isActive
              ? "text-brand-500 flex cursor-pointer gap-2 border-l-2 py-2 pl-2"
              : "flex cursor-pointer gap-2 border-l-2 border-transparent py-2 pl-2 text-neutral-500"
          }
        >
          <RectangleHorizontal /> Tables
        </NavLink>
      </ul>
    </div>
  );
}

export default AdminDrawer;
