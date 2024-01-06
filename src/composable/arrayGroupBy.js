import { formatDate } from './formatDate.js'

export const arrayGroupBy = arr => Object.entries(Object.groupBy(arr, ({ dt_txt }) => formatDate(dt_txt)))