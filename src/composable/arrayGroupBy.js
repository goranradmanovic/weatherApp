import { useFormatDate } from './formatDate.js'

export const useArrayGroupBy = arr => Object.entries(Object.groupBy(arr, ({ dt_txt }) => useFormatDate(dt_txt)))