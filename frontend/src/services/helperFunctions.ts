export function generateTimeOptions(start = 8, end = 22) {
  const options = [];

  for (let hour = start; hour <= end - 1; hour++) {
    const time = new Date();
    time.setHours(hour, 0, 0);

    const formatted = time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    options.push(formatted);
  }

  return options;
}
