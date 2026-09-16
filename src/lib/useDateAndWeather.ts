function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function useDateAndWeather() {
  return `${formatDate(new Date())} · 72° New York`;
}
