export const useFetchData = async (url, headers) => {
	let res = await fetch(url, headers)
	return await res.json()
}