import {
  useMutation,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";

//make the confirm button work

export async function getAllReservation({
  queryString,
  status,
  limit,
}: {
  queryString: string;
  status: string;
  limit: number;
}) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/reservations?${queryString}=${status}&limit=${limit}`,
    );

    const data = await res.json();

    console.log("Reservations retrieved successfully!");

    return data || [];
  } catch (error) {
    console.log(error);
  }
}

// export async function getAllConfirmedReservation() {
//   try {
//     const res = await fetch(`http://localhost:5000/api/reservations/confirmed`);

//     const data = await res.json();

//     console.log("Confirmed Reservations retrieved successfully!");

//     return data || [];
//   } catch (error) {
//     console.log(error);
//   }
// }

export interface ReservationPayload {
  _id?: string;
  tableNumber: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  reservationCode?: string;
  status?: string;
}

export async function handleAddReservation(newReservation: ReservationPayload) {
  try {
    const res = await fetch(`http://localhost:5000/api/reservations`, {
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

export async function handleGetReservationByCode(
  context: QueryFunctionContext,
) {
  const reservationCode = context.queryKey[1] as string;

  try {
    const res = await fetch(
      `http://localhost:5000/api/reservations/${reservationCode}`,
    );

    if (!res.ok) throw new Error("No reservation found.");

    const data = await res.json();

    return data || {};
  } catch (error) {
    console.log(error);
  }
}

async function handleDeleteReservation(id: string) {
  try {
    await fetch(`http://localhost:5000/api/reservations/${id}`, {
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
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}

async function handleUpdateReservation({
  id,
  updatedReservation,
}: {
  id: string;
  updatedReservation: Partial<ReservationPayload>;
}) {
  try {
    await fetch(`http://localhost:5000/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReservation),
    });

    console.log("Updated Successfully!");
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
