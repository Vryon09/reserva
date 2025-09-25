import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { useEffect } from "react";

export function useSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL);

    const invalidateReservationQueries = () => {
      queryClient.invalidateQueries({ queryKey: ["requestedReservations"] });
      queryClient.invalidateQueries({ queryKey: ["confirmedReservations"] });
      queryClient.invalidateQueries({ queryKey: ["todaysStats"] });
      queryClient.invalidateQueries({ queryKey: ["reservationEachDay"] });
      queryClient.invalidateQueries({ queryKey: ["monitorReservation"] });
      queryClient.invalidateQueries({ queryKey: ["qrCode"] });
      queryClient.invalidateQueries({ queryKey: ["forgotCodeResults"] });
    };

    const invalidateTableQueries = () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      queryClient.invalidateQueries({ queryKey: ["tableOccupancy"] });
      queryClient.invalidateQueries({ queryKey: ["topTables"] });
    };

    //RESERVATION
    socket.on("reservationAdded", invalidateReservationQueries);

    socket.on("reservationUpdated", invalidateReservationQueries);

    socket.on("reservationDeleted", invalidateReservationQueries);

    //TABLE
    socket.on("tableAdded", invalidateTableQueries);

    socket.on("tableUpdated", invalidateTableQueries);

    socket.on("tableDeleted", invalidateTableQueries);

    socket.on("tableReservationAdded", invalidateTableQueries);

    socket.on("tableReservationDeleted", invalidateTableQueries);

    socket.on("tableReservationUpdated", invalidateTableQueries);

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
}
