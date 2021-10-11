/* eslint-disable max-lines-per-function */
import { SuggestionUtils } from '@/classes/utils/suggestion-utils'
import { Token } from '@/types'

describe(SuggestionUtils, () => {
  describe('getTokens', () => {
    describe('"Abcde" vs "a cd"', () => {
      it('creates suggestion correctly', () => {
        const expected: Token[] = [
          {
            text: 'A',
            bold: true
          },
          {
            text: 'b',
            bold: false
          },
          {
            text: 'cd',
            bold: true
          },
          {
            text: 'e',
            bold: false
          }
        ]
        expect(
          SuggestionUtils.getTokens(
            'Abcde',
            SuggestionUtils.createEmphasizeRegexp('a cd')
          )
        ).toEqual(expected)
      })
    })

    describe('"Abcde" vs "cd e"', () => {
      it('creates suggestion correctly', () => {
        const expected: Token[] = [
          {
            text: 'Ab',
            bold: false
          },
          {
            text: 'cd',
            bold: true
          },
          {
            text: 'e',
            bold: true
          }
        ]
        expect(
          SuggestionUtils.getTokens(
            'Abcde',
            SuggestionUtils.createEmphasizeRegexp('cd e')
          )
        ).toEqual(expected)
      })
    })

    describe('"aabcde" vs "ab e"', () => {
      it('creates suggestion correctly', () => {
        const expected: Token[] = [
          {
            text: 'a',
            bold: false
          },
          {
            text: 'ab',
            bold: true
          },
          {
            text: 'cd',
            bold: false
          },
          {
            text: 'e',
            bold: true
          }
        ]
        expect(
          SuggestionUtils.getTokens(
            'aabcde',
            SuggestionUtils.createEmphasizeRegexp('ab e')
          )
        ).toEqual(expected)
      })
    })

    describe('"aabcde" vs "a e"', () => {
      it('creates suggestion correctly', () => {
        const expected: Token[] = [
          {
            text: 'a',
            bold: true
          },
          {
            text: 'a',
            bold: true
          },
          {
            text: 'bcd',
            bold: false
          },
          {
            text: 'e',
            bold: true
          }
        ]
        expect(
          SuggestionUtils.getTokens(
            'aabcde',
            SuggestionUtils.createEmphasizeRegexp('a e')
          )
        ).toEqual(expected)
      })
    })
  })

  describe('createFilterRegexp', () => {
    it('"a b" => /^(?=.*a)(?=.*b)/gi', () => {
      expect(SuggestionUtils.createFilterRegexp('a　b')).toEqual(
        /^(?=.*a)(?=.*b)/gi
      )
    })

    it('"a b " => /^(?=.*a)(?=.*b)/gi', () => {
      expect(SuggestionUtils.createFilterRegexp('a　b')).toEqual(
        /^(?=.*a)(?=.*b)/gi
      )
    })

    it('"a　b" matches "cbad"', () => {
      expect(
        SuggestionUtils.createFilterRegexp('a　b').test('cbad')
      ).toBeTruthy()
    })

    it('"a　b" does not matche "cad"', () => {
      expect(SuggestionUtils.createFilterRegexp('a　b').test('cad')).toBeFalsy()
    })

    it('"mico" does not matche "Microsoft"', () => {
      expect(
        SuggestionUtils.createFilterRegexp('mico').test('Microsoft')
      ).toBeFalsy()
    })
  })

  describe('createEmphasizeRegexp', () => {
    it('"a b" => /(a|b)/gi', () => {
      expect(SuggestionUtils.createEmphasizeRegexp('a　b')).toEqual(/(a|b)/gi)
    })

    it('"a b " => /(a|b)/gi', () => {
      expect(SuggestionUtils.createEmphasizeRegexp('a　b ')).toEqual(/(a|b)/gi)
    })
  })
})
