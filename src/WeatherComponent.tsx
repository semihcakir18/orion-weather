import React, { useState, useEffect } from "react";
import HourlyForecastAccordion from "./components/HourlyForecastAccordion";
import { Autocomplete, TextField } from "@mui/material";
import SunnyStreet from "./assets/Images/sunny_street.webp";
import RainyStreet from "./assets/Images/rainy_street.webp";
import AboutToRain from "./assets/Images/about_to_rain.webp";
import Night from "./assets/Images/night.webp";
import Box from "@mui/material/Box";
import { fetchWeatherData } from "./Service";
import { WeatherResponse } from "./Interfaces";
import CurrentWeatherTable from "./components/CurrentWeatherTable";
import DailyForecastTable from "./components/DailyForecastTable";
import { cities, City } from "./data/cities";
import { getWeatherDescription,isLikelyToRain} from "./basic_functions";




const WeatherComponent: React.FC = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);
  const [expanded, setExpanded] = useState<boolean>(true);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await fetchWeatherData(selectedCity);
        setWeather(data);
      } catch (err) {
        setError("Hava durumu bilgileri alınırken bir hata oluştu");
        console.error("API Hatası:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  useEffect(() => {
    if (weather) {
      let backgroundImage;
      if (weather.current.is_day === 1) {
        if (isLikelyToRain(weather)) {
          backgroundImage = RainyStreet;
        } else {
          backgroundImage =
            weather.current.temperature_2m > 15 ? SunnyStreet : AboutToRain;
        }
      } else {
        backgroundImage = Night;
      }

      document.documentElement.style.backgroundImage = `url(${backgroundImage})`;
      document.documentElement.style.backgroundSize = "cover";
      document.documentElement.style.backgroundPosition = "center";
      document.documentElement.style.backgroundRepeat = "no-repeat";
      document.documentElement.style.minHeight = "100vh";
    }
  }, [weather]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  if (!weather) return <div>Hava durumu bilgisi bulunamadı</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        p: 3,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
      }}
    >
      {/* Sol */}
      <Box
        sx={{
          flex: { xs: "1", md: "0 0 30%" },
          minWidth: 0,
        }}
      >
        <Autocomplete
          value={selectedCity}
          onChange={(event, newValue) => {
            if (newValue) {
              setSelectedCity(newValue);
            }
          }}
          options={cities}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Şehir Seçin"
              variant="outlined"
              fullWidth
            />
          )}
          sx={{ mb: 2 }}
        />
        {/* Şu anki durum */}

        <CurrentWeatherTable
          temperature={weather.current.temperature_2m}
          apparentTemperature={weather.current.apparent_temperature}
          isDay={weather.current.is_day}
          humidity={weather.current.relative_humidity_2m}
          windSpeed={weather.current.wind_speed_10m}
        />
        {/* Günlük Tahmin */}
        <DailyForecastTable
          maxTemp={weather.daily.temperature_2m_max[0]}
          minTemp={weather.daily.temperature_2m_min[0]}
          maxFeelsLike={weather.daily.apparent_temperature_max[0]}
          minFeelsLike={weather.daily.apparent_temperature_min[0]}
          daylightDuration={weather.daily.daylight_duration[0]}
          weather_code={getWeatherDescription(weather.daily.weather_code[0])}
        />
      </Box>

      {/* Saatlik */}
      <Box
        sx={{
          flex: { xs: "1", md: "0 0 70%" },
          minWidth: 0,
        }}
      >
        <HourlyForecastAccordion
          expanded={expanded}
          onAccordionChange={handleAccordionChange}
          hourlyData={weather.hourly}
          timezone={weather.timezone}
        />
      </Box>
    </Box>
  );
  
};

export default WeatherComponent;
