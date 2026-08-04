const twoDigits = (value) => String(value).padStart(2, "0");

export function toDateInput(date) {
  return `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`;
}

export function toDateTimeInput(date) {
  return `${toDateInput(date)}T${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`;
}

export function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function formatDate(value, options = {}) {
  if (!value) return "-";
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
    ...options,
  }).format(date);
}

export function formatDateTime(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatTime(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatDateTimeRange(startAt, endAt) {
  if (!startAt || !endAt) return "-";
  const date = formatDate(startAt.slice(0, 10));
  const startTime = startAt.slice(11, 16);
  const endTime = endAt.slice(11, 16);
  return `${date} ${startTime}~${endTime}`;
}

export function isDeadlinePassed(closesAt) {
  return closesAt ? new Date(closesAt).getTime() <= Date.now() : false;
}
