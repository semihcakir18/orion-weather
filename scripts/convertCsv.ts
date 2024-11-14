import { parse } from 'csv-parse/sync';
import * as fs from 'fs';

const csvContent = fs.readFileSync('../orion-weather/src/data/worldcities.csv', 'utf-8');
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
});

const cities = records.map((record: any) => ({
  name: record.city_ascii,
  latitude: parseFloat(record.lat),
  longitude: parseFloat(record.lng),
  country: record.country,
}));

fs.writeFileSync('./src/assets/worldcities.json', JSON.stringify(cities));
