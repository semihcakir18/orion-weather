import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface HourlyForecastProps {
  expanded: boolean;
  onAccordionChange: () => void;
  hourlyData: {
    time: string[];
    temperature_2m: number[];
    is_day: number[];
    precipitation_probability: number[];
    uv_index: number[];
  };
  timezone:string;
}

const HourlyForecastAccordion: React.FC<HourlyForecastProps> = ({
  expanded,
  onAccordionChange,
  hourlyData,
  timezone  
}) => {
  return (
    <Accordion expanded={expanded} onChange={onAccordionChange}>
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
                <TableCell><b>Saat</b></TableCell>
                <TableCell><b>Sıcaklık</b></TableCell>
                <TableCell><b>Gündüz/Gece</b></TableCell>
                <TableCell><b>Yağış Olasılığı</b></TableCell>
                <TableCell><b>UV İndeksi</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {hourlyData.time
  .slice(0, 24)
  .map((time, index) => {
    const cityTime = new Date(time).toLocaleString("tr-TR", {
      timeZone: timezone,
    });
    const cityCurrentTime = new Date().toLocaleString("tr-TR", {
      timeZone: timezone,
    });

    if (new Date(cityTime) < new Date(cityCurrentTime)) {
      return null;
    }

    return (
      <TableRow key={time}>
        <TableCell>
          {new Date(time).toLocaleTimeString("tr-TR", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </TableCell>
                      <TableCell>{hourlyData.temperature_2m[index]}°C</TableCell>
                      <TableCell>
                        {hourlyData.is_day[index] ? "Gündüz" : "Gece"}
                      </TableCell>
                      <TableCell>
                        {hourlyData.precipitation_probability[index]}%
                      </TableCell>
                      <TableCell>{hourlyData.uv_index[index]}</TableCell>
                    </TableRow>
                  );
                })
                .filter(Boolean)}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default HourlyForecastAccordion;
