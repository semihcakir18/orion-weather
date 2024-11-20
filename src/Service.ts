import axios from "axios";
import { City } from "./data/cities";
import { WeatherResponse } from "./Interfaces";


const current_params =
  "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,rain";
const hourly_params =
  "temperature_2m,precipitation_probability,uv_index,is_day";
const daily_params =
  "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,daylight_duration";

export const fetchWeatherData = async (
  selectedCity: City
): Promise<WeatherResponse> => {
  const response = await axios.get<WeatherResponse>(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        current: current_params,
        hourly: hourly_params,
        daily: daily_params,
        timezone: "auto",
      },
    }
  );

  return response.data;
};
