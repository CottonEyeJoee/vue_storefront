<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import axios from 'axios';
import z from 'zod';
import dayjs from 'dayjs'

defineProps<{ msg: string }>()

const units = ['metric', 'imperial'] as const

const widgetSchema = z
  .object({
    location: z.string(),
    temp: z.number(),
    unit: z.enum(units).default(units[0]),
    condition: z.string(),
    humidity: z.number().positive().max(100),
    windSpeed: z.number(),
    time: z.date().default(new Date),
    sunrise: z.number(),
    sunset: z.number(),
  }).nullish()

type Widget = z.infer<typeof widgetSchema>


const openWeatherSchema = z
  .object({
    name: z.string(),
    main: z.object({
      temp: z.number(),
      humidity: z.number().positive().max(100),
    }),
    weather: z.array(z.object({
      description: z.string(),
    })),
    wind: z.object({
      speed: z.number().positive(),
    }),
    sys: z.object({
      sunrise: z.number(),
      sunset: z.number(),
    }),
  }).nullish()

type OpenWeather = z.infer<typeof openWeatherSchema>

const count = ref(0)
const lat = ref<number | undefined>()
const long = ref<number | undefined>()
const widget: Ref<Widget | undefined> = ref()
const openWeather: Ref<OpenWeather | undefined> = ref()

const getWeather = async () => {
  await navigator.geolocation.getCurrentPosition((position) => {
    lat.value = position.coords.latitude;
    long.value = position.coords.longitude;

    const options = {
      method: 'GET',
      url: import.meta.env.VITE_API_BASE_URL,
      params: { lat: lat.value, lon: long.value, units: 'metric', appid: import.meta.env.VITE_API_KEY },
      headers: { accept: 'application/json' }
    };
    axios
      .request(options)
      .then(function (response) {
        const { name, main, weather, wind, sys } = openWeather.value = response.data

        widget.value = {
          location: name,
          temp: main.temp,
          unit: widget.value?.unit ?? 'metric',
          condition: weather[0].description,
          humidity: main.humidity,
          windSpeed: wind.speed,
          time: widget.value?.time ?? new Date,
          sunrise: sys.sunrise,
          sunset: sys.sunset,
        }
      })
      .then(() => {
        console.log(widget.value)
      })
      .catch(function (error) {
        console.error(error);
      });
  });
}

const setToMetric = () => {
  // FIXME: remove force
  widget.value!.unit = 'metric'
}
const setToImperial = () => {
  // FIXME: remove force
  widget.value!.unit = 'imperial'
}
const isMetric = (unit: string) => unit === 'metric'

const toFahrenheit = (tempInC: number) => { return (tempInC * 1.8) + 32 }

const toKMH = (metersInSec: number) => metersInSec * 18 / 5

const toMPH = (metersInSec: number) => metersInSec * 2.236936

onMounted(() => {
  getWeather()
})


</script>

<template>
  <div v-if="!widget">
    <h1>Loading...</h1>
  </div>
  <div v-else>
    <!-- <h1>{{ msg }}</h1> -->
    <h1>Current Weather</h1>

    <div class="card">
      <div>{{ isMetric(widget.unit) ? `${Math.round(widget?.temp)}°C` :
      `${Math.trunc(Math.round(toFahrenheit(widget?.temp)))}°F` }} | <span class="condition-text">{{
  widget.condition
}}</span>
      </div>
      <div>{{ widget.location }}</div>
      <div>Humidity: {{ widget.humidity }}%</div>
      <div>Wind: {{
        isMetric(widget.unit) ?Math.round(toKMH(widget.windSpeed)) :
        Math.round(toMPH(widget.windSpeed) * 10) / 10
      }}{{ isMetric(widget.unit) ?'km/h': 'mph' }}</div>
      <div>Sunrise: {{ dayjs.unix(widget.sunrise).format("HH:mm") }}</div>
      <div>Sunset: {{ dayjs.unix(widget.sunset).format("HH:mm") }}</div>
      <!-- <button type="button" @click="getWeather()">getWeather()</button> -->
      <!-- <p>lat: <code>{{ lat }}</code>, lon: <code>{{ long }}</code></p> -->
      <!-- <p>weather: <code>{{ widget }}</code></p> -->

      <div class="unit-buttons">
        <button type="button" @click="setToMetric()">Metric: °C, m/s</button>
        <button type="button" @click="setToImperial()">Imperial: °F, mph</button>
      </div>
    </div>

    <!-- <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div> -->

    <!-- <div class="card">
    <button type="button" @click="getWeather()">getWeather()</button>
    <p>lat: <code>{{ lat }}</code>, lon: <code>{{ long }}</code></p>
  </div> -->

    <!-- <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p> -->
    <!-- <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p> -->
    <!-- <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p> -->
  </div>
</template>

<style scoped lang="scss">
* {
  margin: 0
}

.card {
  display: grid;
  place-items: center;
  gap: 1rem;
}

.condition-text {
  text-transform: capitalize;
}

.unit-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}
</style>
