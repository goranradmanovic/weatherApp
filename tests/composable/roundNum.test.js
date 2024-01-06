import { describe, expect, it } from 'vitest'
import { roundNum } from '../../src/composable/roundNum.js'

describe('roundNum', () => {
  it ('should round a number to the nearest integer', () => expect(roundNum(5.7)).toBe(6))
  
  it ('should round a number to the nearest negative integer', () => expect(roundNum(-3.4)).toBe(-3))

  it ('should round a already rounded number to same integer', () => expect(roundNum(8)).toBe(8))
})