<template>
  <div class="justify-center w-full min-h-[100dvh] bg-gradient-to-br from-sky-400 via-sky-600 to-sky-800">
    <h1 class="font-medium tracking-tigh text-5xl leading-10 mt-10 text-white">Weather Forecasts</h1>
    <img :src="getImageUrl({ folder: 'images', name: 'weather-forecast', ext: 'svg' })" alt="Weather Forecasts" class="h-24 w-24 mx-auto mb-10">

    <!-- First card -->
    <section v-if="!loading" class="flex flex-col justify-center items-center mb-8">
      <div class="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
        <div class="flex justify-between">
          <div class="flex flex-col">
            <span class="text-6xl font-bold">{{ roundNum(weatherData.list[index][1][0].main.temp) }}°C</span>
            <span class="font-semibold mt-1 text-gray-500 text-left pl-1">{{ weatherData.city.name }}, {{ weatherData.city.country }}</span>
            <span class="font-semibold mt-1 text-gray-500 text-left capitalize pl-1">{{ weatherData.list[index][1][0].weather[0].description }}</span>
          </div>
          <img :src="getImageUrl({ ...iconOpt, name: weatherData.list[index][1][0].weather[0].icon })" alt="Weather Icon" class="h-24 w-24">
        </div>
        <div class="flex justify-between mt-12">
          <div v-for="(value, index) in weatherData.list[index][1]" :key="index" class="flex flex-col items-center">
            <span class="font-semibold text-lg">{{ roundNum(value.main.temp) }}°C</span>
            <img :src="getImageUrl({ ...iconOpt, name: value.weather[0].icon })" alt="Weahter icon" class="h-10 w-10 mt-3">
            <span class="font-semibold mt-1 text-sm">{{ formatDate(value.dt_txt, formatH).split(" ")[0] }}</span>
            <span class="text-xs font-semibold text-gray-400">{{ formatDate(value.dt_txt, formatH).split(" ")[1] }}</span>
          </div>
        </div>
      </div>

      <!-- Second card -->
      <div class="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
        <div v-for="(value, index) in weatherData.list" :key="index" class="flex justify-between items-center">
          <div class="relative flex flex-col items-center group w-1/4">
            <button type="button" @click="changeForecastsDay(index)" class="font-semibold text-left text-lg w-full cursor-pointer hover:text-sky-700 transition ease-in-out delay-400">
              {{ formatDate(value[1][0].dt_txt, formatD) }}
            </button>
            <div class="absolute bottom-2 w-52 flex flex-col items-center hidden mb-5 group-hover:flex">
              <span class="relative rounded-md z-10 p-2 text-xs leading-none text-white bg-slate-600 shadow-lg">Click to change weather forecast!</span>
              <div class="w-3 h-3 -mt-2 rotate-45 bg-slate-600"></div>
            </div>
          </div>
          <div class="flex items-center justify-end w-1/4 pr-10">
            <span class="font-semibold">{{ value[1][0].main.humidity }}%</span>
            <img :src="getImageUrl({ ...iconOpt, name: 'wd' })" alt="Weather Icon" class="h-6 w-6">
          </div>
          <div class="flex items-center justify-end w-1/4 pr-10">
            <span class="font-semibold">
              {{ roundNum(value[1][0].wind.speed) }} 
              <small>km/h</small>
            </span>
            <img :src="getImageUrl({ ...iconOpt, name: 'wi' })" alt="Weather Icon" class="h-6 w-6">
          </div>
          <img :src="getImageUrl({ ...iconOpt, name: value[1][0].weather[0].icon })" alt="Weather Icon" class="h-6 w-6">
          <span class="font-semibold text-lg w-1/4 text-right">
            {{ roundNum(value[1][0].main.temp_min) }}° / {{ roundNum(value[1][0].main.temp_max) }}°
          </span>
        </div>
      </div>
    </section>
    <section v-else class="flex flex-col justify-center items-center mb-8">
      <Loader />
    </section>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { getImageUrl } from '../composable/getImageUrl.js'
  import { formatDate } from '../composable/formatDate.js'
  import { arrayGroupBy } from '../composable/arrayGroupBy.js'
  import { roundNum } from '../composable/roundNum.js'
  import { notification } from '../composable/notification.js'
  import { fetchData } from '../composable/fetchData.js'
  import Loader from '../components/Loader.vue'

  const weatherData = ref(null),
        city = ref("new york"),
        loading = ref(false),
        index = ref(0),
        iconOpt = ref({ folder: 'weather-icons', ext: 'svg', name: '' }),
        url = import.meta.env.VITE_APP_API_BASE,
        key = import.meta.env.VITE_APP_API_KEY,
        additionLocation = `geo/1.0/direct?q=${city.value}&limit=1&appid=${key}`,
        additionWeather = `data/2.5/forecast?appid=${key}&units=metric`,
        headers = { "Accept-Encoding": "gzip" },
        successMsg = "Fetching of data is complited!",
        errorMsg = "Fetching of data is not complited!",
        formatD = { weekday:"short", day:"numeric", month:"short" },
        formatH = { hour: "2-digit", minute: "2-digit" },
        swalOptions = { position: "top-end", showConfirmButton: false, timer: 2000 }

  const getLocationData = async () => {
    let res = await fetchData(`${url}${additionLocation}`, headers)
        res.length ? getWeatherData(res[0].lat, res[0].lon) : notification('error', errorMsg, swalOptions)
  }

  const getWeatherData = async (lat, lon) => {
    loading.value = true

    let res = await fetchData(`${url}${additionWeather}&lat=${lat}&lon=${lon}`, headers)

    if (res.cod === '200') {
      res.list = arrayGroupBy(res.list)
      weatherData.value = res
      notification('success', successMsg, swalOptions)
      loading.value = false
    } else {
      notification('error', errorMsg, swalOptions)
    }
  }

  const changeForecastsDay = i => index.value = i

  await getLocationData()
</script>
