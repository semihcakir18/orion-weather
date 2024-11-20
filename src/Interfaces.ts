export interface CurrentWeatherProps {
  temperature: number;
  apparentTemperature: number;
  isDay: number;
  humidity: number;
  windSpeed: number;
}
export interface DailyForecastProps {
  weather_code: number[];
  maxTemp: number;
  minTemp: number;
  maxFeelsLike: number;
  minFeelsLike: number;
  daylightDuration: number;
}
export interface HourlyForecastProps {
  expanded: boolean;
  onAccordionChange: () => void;
  hourlyData: {
    time: string[];
    temperature_2m: number[];
    is_day: number[];
    precipitation_probability: number[];
    uv_index: number[];
  };
  timezone: string;
}
export interface WeatherResponse {
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    apparent_temperature: number;
    is_day: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    is_day: number[];
    precipitation_probability: number[];
    uv_index: number[];
  };
  daily: {
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    daylight_duration: number[];
  };
}
