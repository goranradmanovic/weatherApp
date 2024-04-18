import { describe, expect, it } from 'vitest'
import { useGetImageUrl } from '../../src/composable/getImageUrl.js'

describe('useGetImageUrl', () => {

	it('should return the correct URL for a given image name', () => {
		const imgOpt = {
				folder: 'weather-icons',
				name : '01d',
				ext: 'svg'
			},
			result = useGetImageUrl(imgOpt),
			expectedUrl = new URL(`../../src/assets/${imgOpt.folder}/${imgOpt.name}.${imgOpt.ext}`, import.meta.url).href

		expect(result).toBe(expectedUrl)
	})
})