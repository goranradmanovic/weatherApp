import { describe, it } from 'vitest'
import { render } from '@testing-library/vue'
import LayoutMain from '../../../src/components/layout/LayoutMain.vue'

describe('LayoutMain', () => {
	it('renders component properly', () => render(LayoutMain))
})
