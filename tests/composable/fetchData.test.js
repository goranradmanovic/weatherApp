import { describe, expect, it } from 'vitest'
import { useFetchData } from '../../src/composable/fetchData.js'

describe('useFetchData', () => {
	it('should fetch and return JSON data', async () => {
		const url = 'https://jsonplaceholder.typicode.com/posts/1',
			headers = { headers: { 'Content-Type': 'application/json' } },
			apiResData = {
				userId: 1,
				id: 1,
				title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
				body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
			},
			result = await useFetchData(url, headers)

		expect(JSON.stringify(result)).toBe(JSON.stringify(apiResData))
	})
})