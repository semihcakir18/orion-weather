
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

interface CurrentWeatherProps {
  temperature: number;
  apparentTemperature: number;
  isDay: number;
  humidity: number;
  windSpeed: number;
}

const CurrentWeatherTable: React.FC<CurrentWeatherProps> = ({
  temperature,
  apparentTemperature,
  isDay,
  humidity,
  windSpeed,
}) => {
  return (
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell><b>Sıcaklık</b></TableCell>
            <TableCell>{temperature}°C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Hissedilen Sıcaklık</b></TableCell>
            <TableCell>{apparentTemperature}°C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Şuan</b></TableCell>
            <TableCell>{isDay ? "Gündüz" : "Gece"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Nem</b></TableCell>
            <TableCell>{humidity}%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Rüzgar Hızı</b></TableCell>
            <TableCell>{windSpeed} km/s</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CurrentWeatherTable;
