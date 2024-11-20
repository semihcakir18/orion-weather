import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { DailyForecastProps } from "../Interfaces";

const DailyForecastTable: React.FC<DailyForecastProps> = ({
  weather_code,
  maxTemp,
  minTemp,
  maxFeelsLike,
  minFeelsLike,
  daylightDuration,
}) => {
  console.log(weather_code);

  return (
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
            <TableCell>{maxTemp}°C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Minimum Sıcaklık</b>
            </TableCell>
            <TableCell>{minTemp}°C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Hissedilen Max</b>
            </TableCell>
            <TableCell>{maxFeelsLike}°C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Hissedilen Min</b>
            </TableCell>
            <TableCell>{minFeelsLike}°C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Anlık Durum</b>
            </TableCell>
            <TableCell>{weather_code}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Gün Işığı Süresi</b>
            </TableCell>
            <TableCell>{(daylightDuration / 3600).toFixed(1)} saat</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DailyForecastTable;
