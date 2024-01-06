import { describe, expect, it } from 'vitest'
import { notification } from '../../src/composable/notification.js'

describe('notification', () => {

	it('should call Swal.fire with the provided parameters', () => {
		const type = 'success',
			msg = 'Hello, Vitest!',
			options = { position: "top-end", showConfirmButton: false, timer: 2000 },
			result = notification(type, msg, options)

		// expect swal icon to be like type
		expect(result.params.icon).toBe(type)

		// expect swal title to be like msg
		expect(result.params.title).toBe(msg)

		// expect swal timer to be like options.timer
		expect(result.params.timer).toBe(options.timer)

		// expect swal position to be like options.position
		expect(result.params.position).toBe(options.position)

		// expect swal showConfirmButton to be like options.showConfirmButton
		expect(result.params.showConfirmButton).toBe(options.showConfirmButton)
	})
})