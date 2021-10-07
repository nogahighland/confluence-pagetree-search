import { SuggestionUtils } from '@/classes/utils/suggestion-utils'
import { Token } from '@/types'

describe(SuggestionUtils, () => {
  it('', () => {
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
