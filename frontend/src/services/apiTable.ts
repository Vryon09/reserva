import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface TablePayload {
  tableNumber: string;
  capacity: number;
  notes: string;
}

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

async function handleAddTable(newTable: TablePayload) {
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
  updatedTable: TablePayload;
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
  tableName,
  date,
  time,
  _id,
}: {
  tableName: string;
  date: string;
  time: string;
  _id: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/tables/reservation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tableName, date, time, _id }),
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

async function handleDeleteReservationInTable({
  tableName,
  date,
  time,
}: {
  tableName: string;
  date: string;
  time: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/tables/reservation`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tableName, date, time }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return await res.json();
}

export function useDeleteReservationInTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleDeleteReservationInTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
  });
}
