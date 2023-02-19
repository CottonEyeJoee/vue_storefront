<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';

import { useStore } from '../store';

const store = useStore();

const isMetric = () => store.data.activeUnit === 'metric';

const dateNow = computed(() => dayjs().format('dddd, D. MMM'));

const temperature = computed(() =>
  isMetric() ? store.tempInC : store.tempInF,
);

const temperatureUnit = computed(() => (isMetric() ? '°C' : '°F'));

const weatherDescription = computed(
  () => store.data.weather ?? 'no description',
);

const weatherIcon = computed(() => {
  // TODO: find weather icon pack
  return {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'cloud',
    '02n': 'cloud',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'rain',
    '09n': 'rain',
    '10d': 'rain',
    '10n': 'rain',
    '11d': 'thunder',
    '11n': 'thunder',
    '13d': 'snow',
    '13n': 'snow',
    // i know a tornado is not fog, the icon pack is very limited... future me problem
    '50d': 'tornado',
    '50n': 'tornado',
  }[store.data.iconCode];
});

const imgSrc = computed(() => {
  return new URL(`../assets/icons/${weatherIcon.value}.svg`, import.meta.url)
    .href;
});

const locationAndCountry = computed(
  () => `${store.data.location}, ${store.data.country}`,
);

const windSpeed = computed(() =>
  isMetric() ? `${store.windInKMH}km/h` : `${store.windInMPH}mph`,
);
</script>

<template>
  <article class="weather-widget grid">
    <header class="grid__top">
      <h2>{{ dateNow }}</h2>
      <h3 class="subtitle">{{ locationAndCountry }}</h3>
    </header>
    <main class="weather-data grid__left">
      <h1 class="temperature">
        {{ temperature }}<sup>{{ temperatureUnit }}</sup>
      </h1>
      <h4 class="description">{{ weatherDescription }}</h4>
    </main>
    <aside class="weather-illustration grid__right">
      <img :src="imgSrc" :alt="`${weatherIcon} illustration`" />
    </aside>
    <footer class="weather-details grid__bottom">
      <ul>
        <li class="flex">
          <img src="../assets/icons/humidity.svg" alt="humidity icon" />
          {{ store.data.humidity }}%
        </li>
        <li class="flex">
          <img src="../assets/icons/wind.svg" alt="wind icon" />
          {{ windSpeed }}
        </li>
        <li class="flex">
          <img
            style="width: 28px"
            src="../assets/icons/sunrise.svg"
            alt="wind icon" />
          {{ store.sunrise }}
        </li>
        <li style="width: 28px" class="flex">
          <img src="../assets/icons/sunset.svg" alt="wind icon" />
          {{ store.sunset }}
        </li>
      </ul>
      <div class="option-buttons">
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
    </footer>
  </article>
</template>

<style scoped lang="scss">
.weather-widget {
  width: 512px;
  padding-inline: 48px;
  padding-block: 52px;
  border-radius: 62px;
  background: radial-gradient(
    119.51% 55.22% at 62.05% 23.11%,
    #ffffff 0%,
    #dff1fe 100%
  );
  box-shadow: -39px 35px 60px rgba(48, 48, 48, 0.15);

  .subtitle {
    font-size: 85%;
    color: hsla(240deg, 14%, 12%, 0.7);
  }

  .weather-data {
    .temperature {
      position: relative;
      margin-block: -16px;
      font-size: 128px;
      font-weight: 600;
      sup {
        position: absolute;
        top: 42px;
        font-size: 24px;
      }
    }
    .description {
      margin-top: -22px;
      font-weight: 400;
      text-transform: capitalize;
    }
  }

  .weather-illustration {
    display: grid;
    place-items: center;
    img {
      height: 248px;
      margin-right: -36px;
    }
  }

  .weather-details {
    display: flex;
    justify-content: space-between;
    ul {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}

.grid {
  display: grid;
  grid-template-columns: auto 3fr;
  grid-template-rows: auto 1fr auto;
  gap: 8px;
  grid-template-areas:
    'top right'
    'left right'
    'bottom bottom';

  &__top {
    grid-area: top;
  }

  &__left {
    grid-area: left;
  }

  &__right {
    grid-area: right;
  }

  &__bottom {
    grid-area: bottom;
  }
}

.flex {
  display: flex;
  align-items: center;
}
.option-buttons {
  display: flex;
  gap: 16px;
  button.active {
    font-weight: 800;
  }
}

h2 {
  font-size: 24px;
  text-align: left;
}

h3 {
  font-size: 18px;
  text-align: left;
}

h4 {
  font-size: 16px;
}

ul {
  padding: 0;
  list-style: none;
}
</style>
