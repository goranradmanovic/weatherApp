import { useRoundNum } from './roundNum.js'

export const useDegToTxt = deg => ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'][useRoundNum((deg / 22.5) + .5) % 16]