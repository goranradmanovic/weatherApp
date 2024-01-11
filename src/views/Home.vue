<template>
  <div class="justify-center w-full min-h-[100dvh] bg-gradient-to-br from-sky-400 via-sky-600 to-sky-800">
    <h1 class="font-medium tracking-tigh text-5xl leading-10 mt-10 mb-10 text-white">Current Conditions</h1>

    <section v-if="!loading" class="flex flex-col justify-center items-center">
      <div class="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
        <div class="flex justify-between">
          <div class="flex flex-col">
            <span class="text-6xl font-bold text-left">{{ useRoundNum(weatherData.main.temp) }}°C</span>
            <span class="font-semibold mt-1 text-gray-500 text-left pl-1">{{ weatherData.name }}, {{ weatherData.sys.country }}, {{ useFormatDate(weatherData.dt, formatH) }}</span>
            <span class="font-semibold mt-1 text-gray-500 text-left capitalize pl-1">{{ weatherData.weather[0].description }}</span>
          </div>
          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: weatherData.weather[0].icon })" alt="Weather Icon" class="h-24 w-24">
            <span class="mt-2 font-semibold text-gray-500 text-center capitalize">{{ weatherData.weather[0].main }}</span>
          </div>
        </div>

        <hr class="mt-10 mb-10"/>

        <div class="flex justify-between">
          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: '04d' })" alt="Weahter icon" class="h-10 w-10" title="Clouds">
            <span class="font-semibold text-xs" title="Clouds">C: {{ weatherData.clouds.all }}%</span>
          </div>

          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: 'wi' })" alt="Weahter icon" class="h-10 w-10" title="Wind direction">
            <span class="font-semibold text-xs text-left" title="Speed">{{ useDegToTxt(weatherData.wind.deg) }}</span>
          </div>

          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: 'sp' })" alt="Weahter icon" class="h-10 w-10" title="Wind Speed">
            <span class="font-semibold text-xs text-left" title="Speed">S: {{ weatherData.wind.speed }} km/h</span>
          </div>

          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: 'gu' })" alt="Weahter icon" class="h-10 w-10" title="Wind Gust">
            <span class="font-semibold text-xs text-left" title="Gust">G: {{ weatherData.wind.gust }} km/h</span>
          </div>

          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: 'wd' })" alt="Weahter icon" class="h-10 w-10" title="Humidity">
            <span class="font-semibold text-xs text-left" title="Humidity">H: {{ weatherData.main.humidity }} %</span>
          </div>

          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: 'pr' })" alt="Weahter icon" class="h-10 w-10" title="Pressure">
            <span class="font-semibold text-xs text-left" title="Pressure">P: {{ weatherData.main.humidity }} bar</span>
          </div>
        </div>

        <hr class="mt-10 mb-10"/>

        <div class="flex justify-between">
          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: 'mit' })" alt="Weahter icon" class="h-10 w-10" title="Min Temp.">
            <span class="font-semibold text-xs text-left" title="Min Temp.">Min: {{ useRoundNum(weatherData.main.temp_min) }}°C</span>
          </div>

          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: 'mxt' })" alt="Weahter icon" class="h-10 w-10" title="Max Temp.">
            <span class="font-semibold text-xs text-left" title="Max Temp.">Max: {{ useRoundNum(weatherData.main.temp_max) }}°C</span>
          </div>

          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: 'fl' })" alt="Weahter icon" class="h-10 w-10" title="Feels Like">
            <span class="font-semibold text-xs text-left" title="Feels Like">Feels: {{ useRoundNum(weatherData.main.feels_like) }}°C</span>
          </div>

          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: 'sr' })" alt="Weahter icon" class="h-10 w-10" title="Sunrise">
            <span class="font-semibold text-xs text-left" title="Sunrise">{{ useFormatDate(weatherData.sys.sunrise, formatH) }}</span>
          </div>

          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: 'ss' })" alt="Weahter icon" class="h-10 w-10" title="Sunset">
            <span class="font-semibold text-xs text-left" title="Sunset">{{ useFormatDate(weatherData.sys.sunset, formatH) }}</span>
          </div>

          <div class="flex flex-col items-center">
            <img :src="useGetImageUrl({ ...iconOpt, name: 'vi' })" alt="Weahter icon" class="h-10 w-10" title="Visibility">
            <span class="font-semibold text-xs text-left" title="Visibility">V: {{ useRoundNum(weatherData.visibility / 1000) }} km</span>
          </div>
        </div>
      </div>
    </section>
    <section v-else class="flex flex-col justify-center items-center">
      <Loader />
    </section>
  </div>
</template>

<script setup>
  import { useGetImageUrl } from '../composable/getImageUrl.js'
  import { useFormatDate } from '../composable/formatDate.js'
  import { useRoundNum } from '../composable/roundNum.js'
  import { useNotification } from '../composable/notification.js'
  import { useGetLocationData } from '../composable/getLocationData.js'
  import { useGetWeatherData } from '../composable/getWeatherData.js'
  import { useDegToTxt } from '../composable/degToTxt.js'
  import { weatherData, loading, iconOpt, formatH, locationOpt, cWOpt } from '../utils/shared-vars.js'
  import Loader from '../components/Loader.vue'

  let cord = null

  loading.value = true
  cord = await useGetLocationData(locationOpt)

  weatherData.value = cord ? await useGetWeatherData({ ...cWOpt, cord: cord }) : false
  loading.value = false
</script>
