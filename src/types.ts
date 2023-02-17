export type Units = 'metric' | 'imperial' | 'standard';

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

// docs: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
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
