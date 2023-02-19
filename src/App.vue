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
  <template v-if="isLoading"> Loading... </template>
  <template v-else-if="isSuccess">
    <WeatherWidget />
  </template>
  <template v-else><span role="alert">Try again</span> </template>
</template>
