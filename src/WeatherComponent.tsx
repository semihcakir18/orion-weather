import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SunnyStreet from "./assets/Sunny Street.webp";
import RainyStreet from "./assets/Rainy Street.webp";
import Box from "@mui/material/Box";
import { fetchWeatherData, WeatherResponse } from "./components/Request";
import CurrentWeatherTable from "./components/CurrentWeatherTable";
import DailyForecastTable from "./components/DailyForecastTable";

//Arkaplan fotoğraflarını yağmur ihtimaline göre çeşitlendir
//Boxları component haline getir
//Bunlar bitince tabloları güzelleştir
// data grid kullan
//url i env donsyasından çek
//requesti düzenle

import { cities, City } from "./data/cities";

const WeatherComponent: React.FC = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleCityChange = (event: any) => {
    const city = cities.find((c) => c.name === event.target.value);
    if (city) {
      setSelectedCity(city);
    }
  };

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
    // BURAYI DÜZELT !!!!
    if (weather) {
      document.documentElement.style.backgroundImage = `url(${
        weather.current.temperature_2m > 15 ? SunnyStreet : RainyStreet
      })`;
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
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Şehir Seçin</InputLabel>
          <Select
            value={selectedCity.name}
            label="Şehir Seçin"
            onChange={handleCityChange}
          >
            {cities.map((city) => (
              <MenuItem key={city.name} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        />
      </Box>

      {/* Sağ */}
      <Box
        sx={{
          flex: { xs: "1", md: "0 0 70%" },
          minWidth: 0,
        }}
      >
        <Accordion expanded={expanded} onChange={handleAccordionChange}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="hourly-weather-content"
          >
            <Typography variant="h6">Saatlik Tahmin</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Saat</b>
                    </TableCell>
                    <TableCell>
                      <b>Sıcaklık</b>
                    </TableCell>
                    <TableCell>
                      <b>Gündüz/Gece</b>
                    </TableCell>
                    <TableCell>
                      <b>Yağış Olasılığı</b>
                    </TableCell>
                    <TableCell>
                      <b>UV İndeksi</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weather.hourly.time
                    .slice(0, 24)
                    .map((time, index) => {
                      const hourTime = new Date(time)
                      const currentTime = new Date()
                    
                      if (hourTime < currentTime) {
                        return null
                      }

                      return (
                        <TableRow key={time}>
                          <TableCell>
                            {hourTime.toLocaleTimeString("tr-TR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </TableCell>
                          <TableCell>{weather.hourly.temperature_2m[index]}°C</TableCell>
                          <TableCell>
                            {weather.hourly.is_day[index] ? "Gündüz" : "Gece"}
                          </TableCell>
                          <TableCell>
                            {weather.hourly.precipitation_probability[index]}%
                          </TableCell>
                          <TableCell>{weather.hourly.uv_index[index]}</TableCell>
                        </TableRow>
                      )
                    })
                    .filter(Boolean)}
                  </TableBody>
                </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default WeatherComponent;
