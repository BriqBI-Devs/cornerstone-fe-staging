import { useEffect, useState } from "react";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

async function fetchWeather(latitude: number, longitude: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`,
  );
  const data = await res.json();
  return Math.round(data.current.temperature_2m);
}

async function fetchCity(latitude: number, longitude: number) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
  );
  const data = await res.json();
  return data.city || data.locality || null;
}

export function useDateAndWeather() {
  const [label] = useState(() => formatDate(new Date()));
  const [tempF, setTempF] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude).then(setTempF).catch(() => {});
        fetchCity(latitude, longitude).then(setCity).catch(() => {});
      },
      () => {},
      { timeout: 5000 },
    );
  }, []);

  if (tempF === null) return label;
  return city ? `${label} · ${tempF}° ${city}` : `${label} · ${tempF}°`;
}
