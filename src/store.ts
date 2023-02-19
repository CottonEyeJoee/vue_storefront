import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { IconCodes, OpenWeatherAPIResponse, Units } from './types';
import { computed, reactive } from 'vue';

dayjs.extend(duration);

const DEFAULT_UNIT: Units = 'metric';

export type Data = {
  location: string | undefined;
  country: string | undefined;
  activeUnit: Units;
  temp: number;
  weather: string | undefined;
  iconCode: IconCodes;
  humidity: number | undefined;
  windSpeed: number;
  timestamp: number;
  sunrise: number | undefined;
  sunset: number | undefined;
};

export const useStore = defineStore(
  'store',
  () => {
    const data = reactive<Data>({
      location: undefined,
      country: undefined,
      activeUnit: DEFAULT_UNIT,
      temp: NaN,
      weather: undefined,
      iconCode: '50d',
      humidity: NaN,
      windSpeed: NaN,
      timestamp: NaN,
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

    const unixToTime = (timestamp: number): string =>
      dayjs.unix(timestamp).format('HH:mm');
    const sunrise = computed((): string =>
      data.sunrise ? unixToTime(data.sunrise) : 'no data',
    );
    const sunset = computed((): string =>
      data.sunset ? unixToTime(data.sunset) : 'no data',
    );

    const isActiveUnit = computed(
      () =>
        (unit: Units): boolean =>
          data.activeUnit === unit,
    );
    function setUnit(newUnit: Units): void {
      data.activeUnit = newUnit;
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
      data.iconCode = weather[0].icon;
      data.humidity = main.humidity;
      data.windSpeed = wind.speed;
      data.timestamp = dayjs().unix();
      data.sunrise = sys.sunrise;
      data.sunset = sys.sunset;
    }

    const isOldData = computed((): boolean =>
      // older > 10min
      dayjs().isAfter(dayjs.unix(data.timestamp).add(dayjs.duration(10, 'm'))),
    );

    return {
      data,
      tempInC,
      tempInF,
      windInKMH,
      windInMPH,
      sunrise,
      sunset,
      isActiveUnit,
      setUnit,
      setData,
      isOldData,
    };
  },
  {
    persist: true,
  },
);
