export type Units = 'metric' | 'imperial' | 'standard';

export type IconCodes =
  | '01d'
  | '01n'
  | '02d'
  | '02n'
  | '03d'
  | '03n'
  | '04d'
  | '04n'
  | '09d'
  | '09n'
  | '10d'
  | '10n'
  | '11d'
  | '11n'
  | '13d'
  | '13n'
  | '50d'
  | '50n';

// docs: https://openweathermap.org/current#parameter
export type OpenWeatherAPIResponse = {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain: Rain;
  dt: number;
  sys: System;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

// docs: https://openweathermap.org/weather-conditions
type Weather = {
  id: number;
  main: string;
  description: string;
  icon: IconCodes;
};

type Coordinates = {
  lon: number;
  lat: number;
};

type Main = {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
};

type Wind = {
  speed: number;
  dep: number;
};

type Clouds = {
  all: number;
};

type Rain = {
  '1h': number;
};

type System = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};
