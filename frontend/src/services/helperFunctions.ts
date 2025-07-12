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
  const options = [];

  const reservations = table.reservations.filter((reservation) => {
    return reservation.date === date;
  });

  for (let hour = start; hour <= end - 1; hour++) {
    const time = new Date();
    time.setHours(hour, 0, 0);

    const formatted = time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (reservations.some((reservation) => reservation.time === formatted))
      continue;

    options.push(formatted);
  }

  return options;
}
