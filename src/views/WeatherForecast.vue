<template>
  <div class="justify-center w-full min-h-[100dvh] bg-gradient-to-br from-sky-400 via-sky-600 to-sky-800">
    <h1 class="font-medium tracking-tigh text-5xl leading-10 mt-10 mb-10 text-white">Forecasts</h1>

    <!-- First card -->
    <section v-if="!loading" class="flex flex-col justify-center items-center mb-8">
      <div class="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
        <div class="flex justify-between">
          <div class="flex flex-col">
            <span class="text-6xl font-bold">{{ useRoundNum(weatherData.list[index][1][0].main.temp) }}°C</span>
            <span class="font-semibold mt-1 text-gray-500 text-left pl-1">{{ weatherData.city.name }}, {{ weatherData.city.country }}</span>
            <span class="font-semibold mt-1 text-gray-500 text-left capitalize pl-1">{{ weatherData.list[index][1][0].weather[0].description }}</span>
          </div>
          <img :src="useGetImageUrl({ ...iconOpt, name: weatherData.list[index][1][0].weather[0].icon })" alt="Weather Icon" class="h-24 w-24">
        </div>
        <div class="flex justify-between mt-12">
          <div v-for="(value, index) in weatherData.list[index][1]" :key="index" class="flex flex-col items-center">
            <span class="font-semibold text-lg">{{ useRoundNum(value.main.temp) }}°C</span>
            <img :src="useGetImageUrl({ ...iconOpt, name: value.weather[0].icon })" alt="Weahter icon" class="h-10 w-10 mt-3">
            <span class="font-semibold mt-1 text-sm">{{ useFormatDate(value.dt_txt, formatH).split(" ")[0] }}</span>
            <span class="text-xs font-semibold text-gray-400">{{ useFormatDate(value.dt_txt, formatH).split(" ")[1] }}</span>
          </div>
        </div>
      </div>

      <!-- Second card -->
      <div class="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
        <div v-for="(value, index) in weatherData.list" :key="index" class="flex justify-between items-center">
          <div class="relative flex flex-col items-center group w-1/4">
            <button type="button" @click="changeForecastsDay(index)" class="font-semibold text-left w-full cursor-pointer hover:text-sky-700 transition ease-in-out delay-400">
              {{ useFormatDate(value[1][0].dt_txt, formatD) }}
            </button>
            <div class="absolute bottom-2 w-52 flex flex-col items-center hidden mb-5 group-hover:flex">
              <span class="relative rounded-md z-10 p-2 text-xs leading-none text-white bg-slate-600 shadow-lg">Click to change weather forecast!</span>
              <div class="w-3 h-3 -mt-2 rotate-45 bg-slate-600"></div>
            </div>
          </div>
          <div class="flex items-center justify-center w-1/4 pr-1">
            <span class="font-semibold">{{ value[1][0].main.humidity }}%</span>
            <img :src="useGetImageUrl({ ...iconOpt, name: 'wd' })" alt="Weather Icon" class="h-6 w-6 ml-1">
          </div>
          <div class="flex items-center justify-end w-1/4 pr-1">
            <span class="font-semibold">{{ value[1][0].main.pressure }}bar</span>
            <img :src="useGetImageUrl({ ...iconOpt, name: 'pr' })" alt="Weather Icon" class="h-6 w-6 ml-1">
          </div>
          <div class="flex items-center justify-end w-1/4 pr-1">
            <span class="font-semibold">
              {{ useDegToTxt(value[1][0].wind.deg) }} 
            </span>
            <img :src="useGetImageUrl({ ...iconOpt, name: 'wi' })" alt="Weather Icon" class="h-6 w-6 ml-1">
          </div>
          <div class="flex items-center justify-end w-1/4 pr-1">
            <span class="font-semibold">
              {{ useRoundNum(value[1][0].wind.speed) }} 
              <small>km/h</small>
            </span>
            <img :src="useGetImageUrl({ ...iconOpt, name: 'sp' })" alt="Weather Icon" class="h-6 w-6 ml-1">
          </div>
          <div class="flex items-center justify-end w-1/6 pr-1">
            <img :src="useGetImageUrl({ ...iconOpt, name: value[1][0].weather[0].icon })" alt="Weather Icon" class="h-6 w-6">
          </div>
          <div class="flex items-center justify-end w-1/5 pr-1">
            <span class="font-semibold text-right">
              {{ useRoundNum(value[1][0].main.temp_min) }}° / {{ useRoundNum(value[1][0].main.temp_max) }}°
            </span>
          </div>
        </div>
      </div>
    </section>
    <section v-else class="flex flex-col justify-center items-center mb-8">
      <Loader />
    </section>
  </div>
</template>

<script setup>
  import { useGetImageUrl } from '../composable/getImageUrl.js'
  import { useFormatDate } from '../composable/formatDate.js'
  import { useArrayGroupBy } from '../composable/arrayGroupBy.js'
  import { useRoundNum } from '../composable/roundNum.js'
  import { useNotification } from '../composable/notification.js'
  import { useGetLocationData } from '../composable/getLocationData.js'
  import { useGetWeatherData } from '../composable/getWeatherData.js'
  import { useDegToTxt } from '../composable/degToTxt.js'
  import { weatherData, loading, index, iconOpt, formatD, formatH, locationOpt, fWOpt } from '../utils/shared-vars.js'
  import Loader from '../components/Loader.vue'

  let cord = null

  const changeForecastsDay = i => index.value = i

  loading.value = true
  cord = await useGetLocationData(locationOpt)

  weatherData.value = cord ? await useGetWeatherData({ ...fWOpt, cord: cord }) : false
  loading.value = false
</script>
