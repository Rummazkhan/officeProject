export function DateFormatter(dateTimeString) {
  const formattedDate = new Date(dateTimeString).toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    hourCycle: "h23",
  });
  return formattedDate + "Z";
}
