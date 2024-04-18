import { describe, it } from 'vitest'
import { shallowMount } from "@vue/test-utils"
import WeatherForecast from '../../src/views/WeatherForecast.vue'

describe('WeatherForecasts', () => {

  it('renders successfully', () => {
    const wrapper = shallowMount(WeatherForecast)
    expect(wrapper.exists()).toBe(true)
  })
})