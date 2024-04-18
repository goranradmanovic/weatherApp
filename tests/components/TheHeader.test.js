import { describe, it } from 'vitest'
import { render } from '@testing-library/vue'
import TheHeader from '../../src/components/TheHeader.vue'

describe('TheHeader', () => {
	it('renders component properly', () => render(TheHeader))
})
