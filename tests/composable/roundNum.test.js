import { describe, expect, it } from 'vitest'
import { useRoundNum } from '../../src/composable/roundNum.js'

describe('useRoundNum', () => {
  it ('should round a number to the nearest integer', () => expect(useRoundNum(5.7)).toBe(6))
  
  it ('should round a number to the nearest negative integer', () => expect(useRoundNum(-3.4)).toBe(-3))

  it ('should round a already rounded number to same integer', () => expect(useRoundNum(8)).toBe(8))
})