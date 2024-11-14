
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface DailyForecastProps {
  maxTemp: number;
  minTemp: number;
  maxFeelsLike: number;
  minFeelsLike: number;
  daylightDuration: number;
}

const DailyForecastTable: React.FC<DailyForecastProps> = ({
  maxTemp,
  minTemp,
  maxFeelsLike,
  minFeelsLike,
  daylightDuration,
}) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6"><b>Günlük Tahmin</b></Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell><b>Maksimum Sıcaklık</b></TableCell>
            <TableCell>{maxTemp}°C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Minimum Sıcaklık</b></TableCell>
            <TableCell>{minTemp}°C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Hissedilen Max</b></TableCell>
            <TableCell>{maxFeelsLike}°C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Hissedilen Min</b></TableCell>
            <TableCell>{minFeelsLike}°C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Gün Işığı Süresi</b></TableCell>
            <TableCell>{(daylightDuration / 3600).toFixed(1)} saat</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DailyForecastTable;
