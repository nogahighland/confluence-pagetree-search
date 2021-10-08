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
        expect(SuggestionUtils.getTokens('Abcde', /(a|cd)/gi)).toEqual(expected)
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
        expect(SuggestionUtils.getTokens('Abcde', /(cd|e)/gi)).toEqual(expected)
      })
    })
  })

  describe('createRegexp', () => {
    it('正常に正規表現が作成される', () => {
      expect(SuggestionUtils.createRegexp('a　b')).toEqual(/^(?=.*a)(?=.*b)/gi)
    })
  })
})
