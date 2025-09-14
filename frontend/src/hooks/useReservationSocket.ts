import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { useEffect } from "react";

export function useReservationSocket() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL);

    socket.on("reservationAdded", (data) => {
      console.log(data);

      queryClient.invalidateQueries({ queryKey: ["requestedReservations"] });
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
}
