
export interface WeatherAPI {
    latitude: number;
    longitude: number;
    timezone: string;
    temperature_hour: number;
    precipitation_hour: number;
    weathercode_hour: number;
    temperature_max: number;
    temperature_min: number;
    windspeed_max: number;
    image_weather: string;          
}