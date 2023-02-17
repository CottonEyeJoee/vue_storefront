import { defineStore } from 'pinia';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { OpenWeatherAPIResponse, Units } from './types';
import { computed, reactive, ref } from 'vue';

dayjs.extend(duration);

const DEFAULT_UNIT: Units = 'metric';

export type Data = {
  location: string | undefined;
  country: string | undefined;
  temp: number;
  weather: string | undefined;
  humidity: number | undefined;
  windSpeed: number;
  timestamp: Dayjs;
  sunrise: number | undefined;
  sunset: number | undefined;
};

export const useStore = defineStore('store', () => {
  const data = reactive<Data>({
    location: undefined,
    country: undefined,
    temp: NaN,
    weather: undefined,
    humidity: undefined,
    windSpeed: NaN,
    timestamp: dayjs(),
    sunrise: undefined,
    sunset: undefined,
  });

  const tempInC = computed((): number =>
    Math.trunc(Math.round(data.temp - 273.15)),
  );
  const tempInF = computed((): number =>
    Math.trunc(Math.round(1.8 * (data.temp - 273) + 32)),
  );

  const windInKMH = computed((): number =>
    Math.round((data.windSpeed * 18) / 5),
  );
  const windInMPH = computed(
    (): number => Math.round(data.windSpeed * 2.236936 * 10) / 10,
  );

  const sunrise = computed((): string =>
    data.sunrise ? dayjs.unix(data.sunrise).format('HH:mm') : 'no data',
  );
  const sunset = computed((): string =>
    data.sunset ? dayjs.unix(data.sunset).format('HH:mm') : 'no data',
  );

  const activeUnit = ref<Units>(DEFAULT_UNIT);
  const isActiveUnit = computed(() => (unit: Units): boolean => {
    return activeUnit.value === unit;
  });
  function setUnit(newUnit: Units): void {
    activeUnit.value = newUnit;
  }

  function setData({
    name,
    main,
    weather,
    wind,
    sys,
  }: OpenWeatherAPIResponse): void {
    data.location = name;
    data.country = sys.country;
    data.temp = main.temp;
    data.weather = weather[0].description;
    data.humidity = main.humidity;
    data.windSpeed = wind.speed;
    data.timestamp = dayjs();
    data.sunrise = sys.sunrise;
    data.sunset = sys.sunset;
  }

  function addTenMinutes(date: Dayjs): Dayjs {
    return date.add(dayjs.duration(10, 'm'));
  }

  return {
    data,
    tempInC,
    tempInF,
    windInKMH,
    windInMPH,
    sunrise,
    sunset,
    activeUnit,
    isActiveUnit,
    setUnit,
    setData,
    addTenMinutes,
  };
});
