import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Table } from "../features/Admin/types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function getAllTables({
  queryString,
  value,
}: {
  queryString: string;
  value: string;
}) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/tables?${queryString}=${value}`,
    );

    const data = await res.json();

    return data || [];
  } catch (error) {
    console.log(error);
  }
}

export async function handleGetTable(tableId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tables/${tableId}`);

    if (!res.ok) throw new Error("No reservation found.");

    const data = await res.json();

    return data || {};
  } catch (error) {
    console.log(error);
  }
}

async function handleAddTable(newTable: Partial<Table>) {
  try {
    await fetch(`${API_BASE_URL}/api/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTable),
    });
  } catch (error) {
    console.log(error);
  }
}

export function useAddTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleAddTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table added successfully!");
    },
    onError: () => {
      toast.error("Failed to add a table");
    },
  });
}

async function handleDeleteTable(id: string) {
  try {
    await fetch(`${API_BASE_URL}/api/tables/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
}

export function useDeleteTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleDeleteTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete a table");
    },
  });
}

async function handleUpdateTable({
  id,
  updatedTable,
}: {
  id: string;
  updatedTable: Partial<Table>;
}) {
  try {
    await fetch(`${API_BASE_URL}/api/tables/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTable),
    });
  } catch (error) {
    console.log(error);
  }
}

export function useUpdateTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleUpdateTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update a table");
    },
  });
}

async function handleAddReservationInTable({
  tableId,
  name,
  phone,
  reservationDate,
  _id,
}: {
  tableId: string;
  name: string;
  phone: string;
  reservationDate: string;
  _id: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/tables/reservation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tableId, name, phone, reservationDate, _id }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return await res.json();
}

export function useAddReservationInTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleAddReservationInTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
  });
}

//Search: handleDeleteReservationInTable
async function handleDeleteReservation({
  tableId,
  reservationId,
}: {
  tableId: string;
  reservationId: string;
}) {
  const res = await fetch(
    `${API_BASE_URL}/api/tables/${tableId}/reservations/${reservationId}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return await res.json();
}

export function useDeleteReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleDeleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
  });
}

async function handleUpdateReservationStatus({
  tableId,
  reservationId,
  status,
}: {
  tableId: string;
  reservationId: string;
  status: string;
}) {
  try {
    await fetch(
      `${API_BASE_URL}/api/tables/${tableId}/reservations/${reservationId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      },
    );
  } catch (error) {
    console.log(error);
  }
}

export function useUpdateReservationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleUpdateReservationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table synced successfully!");
    },
    onError: () => {
      toast.error("Failed to sync a table reservation status");
    },
  });
}

export async function getTableOccupancy() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tables/stats/table-occupancy`);

    const data = await res.json();

    return data || [];
  } catch (error) {
    console.log(error);
  }
}

export async function getTopTables() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tables/stats/top-tables`);

    const data = await res.json();

    return data || [];
  } catch (error) {
    console.log(error);
  }
}
