//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// *** NOTE ***//

// This test is failing because 'groupBy' object function is not yet supporetd in NodeJS, but this is how it should look like

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

import { describe, expect, it } from 'vitest'
import { arrayGroupBy } from '../../src/composable/arrayGroupBy.js'

describe('arrayGroupBy', () => {

	it('should group array items by formatted date', () => {
		const inputArr = [
			{ dt_txt: '2022-01-05T12:00:00', loggedIn: true },
			{ dt_txt: '2022-01-05T15:00:00', loggedIn: false },
			{ dt_txt: '2022-01-05T22:00:00', loggedIn: true },
			{ dt_txt: '2022-01-06T09:00:00', loggedIn: false },
			{ dt_txt: '2022-01-06T10:00:00', loggedIn: true },
			{ dt_txt: '2022-01-06T22:00:00', loggedIn: false },
			{ dt_txt: '2022-01-07T13:30:00', loggedIn: true },
			{ dt_txt: '2022-01-07T18:30:00', loggedIn: false },
			{ dt_txt: '2022-01-07T23:00:00', loggedIn: true }
		],
		expectedArr = [
			[
				{ dt_txt: '2022-01-05T12:00:00', loggedIn: true },
				{ dt_txt: '2022-01-05T15:00:00', loggedIn: false },
				{ dt_txt: '2022-01-05T22:00:00', loggedIn: true }
			],
			[
				{ dt_txt: '2022-01-06T09:00:00', loggedIn: false },
				{ dt_txt: '2022-01-06T10:00:00', loggedIn: true },
				{ dt_txt: '2022-01-06T22:00:00', loggedIn: false }
			],
			[
				{ dt_txt: '2022-01-07T13:30:00', loggedIn: true },
				{ dt_txt: '2022-01-07T18:30:00', loggedIn: false },
				{ dt_txt: '2022-01-07T23:00:00', loggedIn: true }
			]
		],
		result = arrayGroupBy(inputArr)

		expect(result).toBe(expectedArr)
	})
})

*/

import { test } from 'vitest'

test('Skipped because "groupBy" object function is not yet supporetd in NodeJS', t => t.skip())