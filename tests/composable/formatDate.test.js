import { describe, it, expect } from 'vitest'
import { useFormatDate } from '../../src/composable/formatDate.js'

describe('useFormatDate', () => {
	const date = new Date(),
	    formatD = { weekday:"short" },
	    formatL = { weekday:"short", day:"numeric", month:"short" },
        formatH = { hour: "2-digit", minute: "2-digit" },
		expectedOutputDefault = new Intl.DateTimeFormat(navigator.language, formatD).format(date),
		expectedOutputLong = new Intl.DateTimeFormat(navigator.language, formatL).format(date),
		expectedOutputHour = new Intl.DateTimeFormat(navigator.language, formatH).format(date)

	it('should format a date with default options if options are not provided', () => expect(useFormatDate(date)).toBe(expectedOutputDefault))

	it('should format a date with the specified options', () => expect(useFormatDate(date, formatL)).toBe(expectedOutputLong))

	it('should format a date with the specified hour options', () => expect(useFormatDate(date, formatH)).toBe(expectedOutputHour))
})