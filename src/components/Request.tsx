// export default function Request() {
//     interface WeatherResponse {
//         current: {
//           time: string;
//           temperature_2m: number;
//           relative_humidity_2m: number;
//           wind_speed_10m: number;
//           apparent_temperature: number;
//           is_day: number;
//         };
//         hourly: {
//           time: string[];
//           temperature_2m: number[];
//           is_day: number[];
//           precipitation_probability: number[];
//           uv_index: number[];
//         };
//         daily: {
//           weather_code: number[];
//           temperature_2m_max: number[];
//           temperature_2m_min: number[];
//           apparent_temperature_max: number[];
//           apparent_temperature_min: number[];
//           daylight_duration: number[];
//         };
//       }
//       const fetchWeather = async () => {
//         try {
//           const response = await axios.get<WeatherResponse>(
//             "https://api.open-meteo.com/v1/forecast",
//             {
//               params: {
//                 latitude: selectedCity.latitude,
//                 longitude: selectedCity.longitude,
//                 current:
//                   current_params,
//                 hourly:
//                   hourly_params,
//                 daily:
//                   daily_params,
//                 timezone: "auto",
//               },
//             }
//           );
//           console.log(response.data);
//           setWeather(response.data);
//         } catch (err) {
//           setError("Hava durumu bilgileri alınırken bir hata oluştu");
//           console.error("API Hatası:", err);
//         } finally {
//           setLoading(false);
//         }
//       };
  
//     return {}
// }