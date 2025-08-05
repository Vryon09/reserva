import toast from "react-hot-toast";

interface Table {
  _id: string;
  tableNumber: string;
  capacity: number;
  notes: string;
  status: string;
  reservations: {
    date: string;
    time: string;
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

  const reservationHours = table.reservations
    .filter((reservation) => reservation.date === date)
    .map((reservation) => +reservation.time.split(":")[0]);

  for (let hour = start; hour <= end - 1; hour++) {
    const isBlocked = reservationHours.some(
      (reservationHour) =>
        hour >= reservationHour - 1 && hour < reservationHour + 2,
    );

    if (isBlocked) continue;

    const time = `${hour}:00`;
    options.push(time);
  }

  return options;
}

// export function generateTimeOptions2({
//   start = 8,
//   end = 22,
//   table,
//   date,
// }: {
//   start: number;
//   end: number;
//   table: Table;
//   date: string;
// }) {
//   const timeOptions: string[] = [];

//   const reservationHours = table.reservations.filter(
//     (reservation) => reservation.date === date,
//   );

//   //finish this function

//   for (let hour = start; hour <= end; hour++) {
//     timeOptions.push(`${hour}:00`);
//     timeOptions.push(`${hour}:30`);
//   }

//   return timeOptions;
// }

export async function copyCode({ code }: { code: string }) {
  try {
    await navigator.clipboard.writeText(code);
    toast.success("Copied Successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Failed to copy!");
  }
}
