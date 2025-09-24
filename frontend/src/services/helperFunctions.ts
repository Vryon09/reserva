import { format } from "date-fns";
import toast from "react-hot-toast";

interface Table {
  _id: string;
  tableName: string;
  capacity: number;
  notes: string;
  status: string;
  reservations: {
    reservationDate: string;
  }[];
}

export function generateTimeOptions({
  start = 8,
  end = 22,
  table,
  date,
}: {
  start: number;
  end: number;
  table: Table;
  date: string;
}) {
  const options: string[] = [];
  const now = new Date();

  const reservationHours = table.reservations
    .filter((reservation) => {
      const reservationDate = format(
        new Date(reservation.reservationDate),
        "yyyy-MM-dd",
      );

      return reservationDate === date;
    })
    .map((reservation) => {
      const reservationTime = format(
        new Date(reservation.reservationDate),
        "HH",
      );

      return +reservationTime;
    });

  for (let hour = start; hour <= end - 1; hour++) {
    const isBlocked = reservationHours.some(
      (reservationHour) =>
        hour >= reservationHour - 1 && hour < reservationHour + 2,
    );

    const formattedHour = hour.toString().length > 1 ? hour : `0${hour}`;
    const resDate = new Date(`${date}T${formattedHour}:00:00.000`);
    const resDate12Before = new Date(resDate.getTime() - 12 * 60 * 60 * 1000);
    const hour12hBeforeRes = now >= resDate12Before;
    if (isBlocked || hour12hBeforeRes) continue;

    const time = `${formattedHour}:00`;
    options.push(time);
  }

  return options;
}

export async function copyCode({ code }: { code: string }) {
  try {
    await navigator.clipboard.writeText(code);
    toast.success("Copied Successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Failed to copy!");
  }
}

export function getToken() {
  const token = localStorage.getItem("adminToken");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("adminToken");
      return null;
    }

    return token;
  } catch {
    return null;
  }
}
