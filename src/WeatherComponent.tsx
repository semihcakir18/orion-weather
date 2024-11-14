import React, { useState, useEffect } from "react";
import axios from "axios";
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

//Arkaplan fotoğraflarını yağmur ihtimaline göre çeşitlendir
//Boxları component haline getir
//Bunlar bitince tabloları güzelleştir

interface WeatherResponse {
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
let current_params = "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,rain"
let hourly_params = "temperature_2m,precipitation_probability,uv_index,is_day";
let daily_params = "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,daylight_duration"
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherResponse>(
          "https://api.open-meteo.com/v1/forecast",
          {
            params: {
              latitude: selectedCity.latitude,
              longitude: selectedCity.longitude,
              current:
                current_params,
              hourly:
                hourly_params,
              daily:
                daily_params,
              timezone: "auto",
            },
          }
        );
        console.log(response.data);
        setWeather(response.data);
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

        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>Sıcaklık</b>
                </TableCell>
                <TableCell>{weather.current.temperature_2m}°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Hissedilen Sıcaklık</b>
                </TableCell>
                <TableCell>{weather.current.apparent_temperature}°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Şuan</b>
                </TableCell>
                <TableCell>
                  {weather.current.is_day ? "Gündüz" : "Gece"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Nem</b>
                </TableCell>
                <TableCell>{weather.current.relative_humidity_2m}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Rüzgar Hızı</b>
                </TableCell>
                <TableCell>{weather.current.wind_speed_10m} km/s</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Typography variant="h6">
            <b>Günlük Tahmin</b>
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>Maksimum Sıcaklık</b>
                </TableCell>
                <TableCell>{weather.daily.temperature_2m_max[0]}°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Minimum Sıcaklık</b>
                </TableCell>
                <TableCell>{weather.daily.temperature_2m_min[0]}°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Hissedilen Max</b>
                </TableCell>
                <TableCell>
                  {weather.daily.apparent_temperature_max[0]}°C
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Hissedilen Min</b>
                </TableCell>
                <TableCell>
                  {weather.daily.apparent_temperature_min[0]}°C
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Gün Işığı Süresi</b>
                </TableCell>
                <TableCell>
                  {(weather.daily.daylight_duration[0] / 3600).toFixed(1)} saat
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
                  {weather.hourly.time.slice(0, 24).map((time, index) => (
                    <TableRow key={time}>
                      <TableCell>
                        {new Date(time).toLocaleTimeString("tr-TR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>
                        {weather.hourly.temperature_2m[index]}°C
                      </TableCell>
                      <TableCell>
                        {weather.hourly.is_day[index] ? "Gündüz" : "Gece"}
                      </TableCell>
                      <TableCell>
                        {weather.hourly.precipitation_probability[index]}%
                      </TableCell>
                      <TableCell>{weather.hourly.uv_index[index]}</TableCell>
                    </TableRow>
                  ))}
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
