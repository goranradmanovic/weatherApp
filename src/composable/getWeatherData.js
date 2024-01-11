import { useNotification } from './notification.js'
import { useFetchData } from '../composable/fetchData.js'
import { useArrayGroupBy } from '../composable/arrayGroupBy.js'

export const useGetWeatherData = async param => {
  let res = await useFetchData(`${param.url}&lat=${param.cord.lat}&lon=${param.cord.lon}`, param.headers)

  if (res.cod == 200) {
    res.hasOwnProperty('list') ? res.list = useArrayGroupBy(res.list) : false
    useNotification('success', param.succMsg, param.swalOpt)
    return res
  } else {
    useNotification('error', param.errMsg, param.swalOpt)
  }
}