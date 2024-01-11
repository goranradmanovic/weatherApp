import { ref } from 'vue'

const weatherData = ref(null),
      city = ref("new york"),
      loading = ref(false),
      index = ref(0),
      iconOpt = ref({ folder: 'weather-icons', ext: 'svg', name: '' }),
      url = import.meta.env.VITE_APP_API_BASE,
      key = import.meta.env.VITE_APP_API_KEY,
      headers = { "Accept-Encoding": "gzip" },
      successMsg = "Fetching of data is complited!",
      errorMsg = "Fetching of data is not complited!",
      formatD = { weekday:"short", day:"numeric", month:"short" },
      formatH = { hour: "2-digit", minute: "2-digit" },
      swalOptions = { position: "top-end", showConfirmButton: false, timer: 2000 },
      addLocation = `geo/1.0/direct?q=${city.value}&limit=1&appid=${key}`,
      locationOpt = {
        url: `${url}${addLocation}`,
        headers,
        swalOpt: swalOptions,
        errMsg: errorMsg
      },
      forecastWeather = `data/2.5/forecast?appid=${key}&units=metric`,
      fWOpt = {
        url: `${url}${forecastWeather}`,
        headers,
        cord: null,
        swalOpt: swalOptions,
        errMsg: errorMsg,
        succMsg: successMsg
      },
      currentWeather = `data/2.5/weather?appid=${key}&units=metric`,
      cWOpt = {
        url: `${url}${currentWeather}`,
        headers,
        cord: null,
        swalOpt: swalOptions,
        errMsg: errorMsg,
        succMsg: successMsg
      }

export { weatherData, loading, index, iconOpt, formatD, formatH, locationOpt, fWOpt, cWOpt }