import { describe, it } from 'vitest'
import { mount, } from "@vue/test-utils"
import WeatherForecast from '../../src/views/WeatherForecast.vue'

describe('WeatherForecasts', () => {
  it('mount weather forecast view properly', () => mount(WeatherForecast))
})