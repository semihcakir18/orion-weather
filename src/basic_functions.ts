import { WeatherResponse } from "./Interfaces";

export const isLikelyToRain = (weather: WeatherResponse): boolean => {
    const nextHours = weather.hourly.precipitation_probability.slice(0, 6);
    return nextHours.some((probability: number) => probability > 60);
  };
export const getWeatherDescription = (code: number): string => {
    const weatherCodes: Record<number, string> = {
      0: "Açık gökyüzü",
      1: "Genelde açık",
      2: "Parçalı bulutlu",
      3: "Bulutlu",
      45: "Sisli",
      48: "Kırağı biriken sis",
      51: "Hafif çisenti",
      53: "Orta şiddette çisenti",
      55: "Yoğun çisenti",
      61: "Hafif yağmur",
      63: "Orta şiddette yağmur",
      65: "Şiddetli yağmur",
      80: "Sağanak yağmur",
    };

    return weatherCodes[code] || "Unknown";
  };

