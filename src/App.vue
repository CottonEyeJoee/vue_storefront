<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios, { AxiosError, AxiosResponse } from 'axios';
import WeatherWidget from './components/WeatherWidget.vue';
import { OpenWeatherAPIResponse } from './types';
import { useStore } from './store';

const store = useStore();

let lat = ref<number | undefined>(undefined);
let long = ref<number | undefined>(undefined);
const isLoading = ref<boolean>(true);
const isSuccess = ref<boolean | undefined>();

const fetchData = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    lat.value = position.coords.latitude;
    long.value = position.coords.longitude;

    const options = {
      method: 'GET',
      url: import.meta.env.VITE_API_BASE_URL,
      params: {
        lat: lat.value,
        lon: long.value,
        appid: import.meta.env.VITE_API_KEY,
      },
      headers: { accept: 'application/json' },
    };

    axios
      .request(options)
      .then((response: AxiosResponse<OpenWeatherAPIResponse>) => {
        store.setData(response.data);
      })
      .then(() => {
        isLoading.value = false;
        isSuccess.value = true;
      })
      .catch(function (error: AxiosError) {
        isSuccess.value = false;
        console.error(error);
      });
  });
};

const cleareLocalStorage = () => {
  localStorage.clear();
};

const isOldData = () => {
  if (store.isOldData) {
    console.log('old data');
  } else {
    console.log('new data');
  }
};

onMounted(() => {
  // TODO: find a better way if data is initialized
  if (store.isOldData || !store.data.location) {
    fetchData();
  } else {
    // TODO: move to store.data and create getter isInitialized???
    isLoading.value = false;
    isSuccess.value = true;
  }
});
</script>

<template>
  <!-- TODO: remove imgs -->
  <!-- <img src="/vite.svg" class="logo" alt="Vite logo" /> -->
  <!-- <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" /> -->

  <template v-if="isLoading"> Loading... </template>
  <template v-else-if="isSuccess">
    <WeatherWidget />
    <!-- TODO: remove buttons -->
    <!-- <button @click="cleareLocalStorage">localStorage.clear()</button> -->
    <!-- <button @click="isOldData">isOldData</button> -->
  </template>
  <template v-else> Try again </template>
</template>

<style scoped>
/* TODO: remove styles */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
