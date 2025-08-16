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
  const now = new Date();

  const reservationHours = table.reservations
    .filter((reservation) => reservation.date === date)
    .map((reservation) => +reservation.time.split(":")[0]);

  for (let hour = start; hour <= end - 1; hour++) {
    const isBlocked = reservationHours.some(
      (reservationHour) =>
        hour >= reservationHour - 1 && hour < reservationHour + 2,
    );

    const formattedHour = hour.toString().length > 1 ? hour : `0${hour}`;
    const resDate = new Date(`${date}T${formattedHour}:00:00.000`);
    const resDate12Before = new Date(resDate.getTime() - 12 * 60 * 60 * 1000);
    const hour12hBeforeRes = now >= resDate12Before;
    //fix the 12 hours trigger

    if (isBlocked || hour12hBeforeRes) continue;

    const time = `${formattedHour}:00`;
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
