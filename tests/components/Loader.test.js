import { describe, it } from 'vitest'
import { render } from '@testing-library/vue'
import Loader from '../../src/components/Loader.vue'

describe('Loader', () => {
	it('renders component properly', () => render(Loader))
})
