import { useContext } from "react";
import { ReservationFormContext } from "./ReservationFormContext";

export function useReservationForm() {
  const context = useContext(ReservationFormContext);
  if (context === undefined)
    throw new Error(
      "ReservationFormContext is used outside the ItemsProvider.",
    );
  return context;
}
