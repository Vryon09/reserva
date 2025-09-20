import {
  useMutation,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import type { ReservationTypes } from "../features/Admin/types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function getAllReservation({
  queryString,
  status,
  limit,
  page,
}: {
  queryString: string;
  status: string;
  limit: number;
  page: number;
}) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/reservations?${queryString}=${status}&limit=${limit}&page=${page}`,
    );

    const data = await res.json();

    return data || [];
  } catch (error) {
    console.log(error);
  }
}

export async function handleGerReservation(reservationId: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/reservations/${reservationId}`,
    );

    if (!res.ok) throw new Error("No reservation found.");

    const data = await res.json();

    return data || {};
  } catch (error) {
    console.log(error);
  }
}

export async function handleGetReservationByCode(
  context: QueryFunctionContext,
) {
  const reservationCode = context.queryKey[1] as string;

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/reservations/code/key/${reservationCode}`,
    );

    if (!res.ok) throw new Error("No reservation found.");

    const data = await res.json();

    return data || {};
  } catch (error) {
    console.log(error);
  }
}

export async function handleAddReservation(
  newReservation: Partial<ReservationTypes>,
) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReservation),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export function useAddReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleAddReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requestedReservations"] });
    },
  });
}

async function handleDeleteReservation(id: string) {
  try {
    await fetch(`${API_BASE_URL}/api/reservations/${id}`, {
      method: "DELETE",
    });

    console.log("Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
}

export function useDeleteReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleDeleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requestedReservations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["confirmedReservations"],
      });
    },
  });
}

async function handleUpdateReservation({
  id,
  updatedReservation,
}: {
  id: string;
  updatedReservation: Partial<ReservationTypes>;
}) {
  try {
    await fetch(`${API_BASE_URL}/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReservation),
    });
  } catch (error) {
    console.log(error);
  }
}

export function useUpdateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleUpdateReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requestedReservations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["confirmedReservations"],
      });
    },
  });
}

export async function getTodaysStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reservations/stats/today`);

    const data = await res.json();

    return data || [];
  } catch (error) {
    console.log(error);
  }
}

export async function getResNextXHrs({ hours }: { hours: number }) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/reservations/next-hours?hours=${hours}`,
    );

    const data = await res.json();

    return data || [];
  } catch (error) {
    console.log(error);
  }
}

export async function getReservationCountsByDay({
  status,
}: {
  status: string;
}) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/reservations/stats/by-day?status=${status}`,
    );

    const data = await res.json();

    return data || [];
  } catch (error) {
    console.log(error);
  }
}

export async function handleGetQRCode(code: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/reservations/code/qrcode/${code}`,
    );

    if (!res.ok) throw new Error("No reservation found.");

    const data = await res.json();

    return data || "";
  } catch (error) {
    console.log(error);
  }
}
