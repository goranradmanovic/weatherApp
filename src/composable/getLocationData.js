import { useNotification } from './notification.js'
import { useFetchData } from '../composable/fetchData.js'

export const useGetLocationData = async param => {
	let res = await useFetchData(param.url, param.headers)
    return res.length ? { lat: res[0].lat, lon: res[0].lon } : useNotification('error', param.errMsg, param.swalOpt)
}