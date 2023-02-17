<script setup lang="ts">
import { computed } from 'vue';

import { useStore } from '../store';

const store = useStore();

const isMetric = () => store.data.activeUnit === 'metric';

const temperature = computed(() =>
  isMetric() ? `${store.tempInC}°C` : `${store.tempInF}°F`,
);

const weatherDescription = computed(
  () => store.data.weather ?? 'no description',
);

const locationAndCountry = computed(
  () => `${store.data.location}, ${store.data.country}`,
);

const windSpeed = computed(() =>
  isMetric() ? `${store.windInKMH}km/h` : `${store.windInMPH}mph`,
);
</script>

<template>
  <h1>Current Weather</h1>

  <div class="card">
    <div class="capitalize">{{ temperature }} | {{ weatherDescription }}</div>
    <div>{{ locationAndCountry }}</div>
    <div>Humidity: {{ store.data.humidity }}%</div>
    <div>Wind: {{ windSpeed }}</div>
    <div>Sunrise: {{ store.sunrise }}</div>
    <div>Sunset: {{ store.sunset }}</div>
    <div class="button-group">
      <button
        type="button"
        :class="store.isActiveUnit('metric') && 'active'"
        @click="store.setUnit('metric')"
        title="°C, m/s">
        Metric
      </button>
      <button
        type="button"
        :class="store.isActiveUnit('imperial') && 'active'"
        @click="store.setUnit('imperial')"
        title="°F, mph">
        Imperial
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  margin: 0;
}

.card {
  display: grid;
  place-items: center;
  gap: 1rem;
}

.capitalize {
  text-transform: capitalize;
}
.button-group {
  display: flex;
  justify-content: center;
  gap: 16px;
  button.active {
    background-color: #646cff;
  }
}
</style>
