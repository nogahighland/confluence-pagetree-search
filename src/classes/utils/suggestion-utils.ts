import { Token } from '@/types'

export class SuggestionUtils {
  static getTokens(text: string, regexp: RegExp): Token[] {
    const tokens: Token[] = []
    const match = [...text.matchAll(regexp)]
    let prevIndex = 0

    match.forEach(m => {
      const token = m[0]

      if (!m.index) {
        tokens.push({ text: token, bold: true })
      } else {
        const unmatchedToken = text.slice(prevIndex, m.index)
        if (unmatchedToken) {
          tokens.push({
            text: unmatchedToken,
            bold: false
          })
        }
        tokens.push({
          text: token,
          bold: true
        })
      }
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      prevIndex = m.index! + token.length
    })

    if (prevIndex < text.length) {
      tokens.push({ text: text.slice(prevIndex), bold: false })
    }
    return tokens
  }

  static createFilterRegexp(query: string): RegExp {
    const r = query
      .trim()
      .replace(/　/g, ' ') // eslint-disable-line no-irregular-whitespace
      .split(/\s/)
      .map(s => `(?=.*${s})`) // https://qiita.com/n4o847/items/dbcd0b8af3781d221424
      .join('')
    return new RegExp(`^${r}`, 'gi')
  }

  static createEmphasizeRegexp(query: string): RegExp {
    const r = `(${query
      .trim()
      .replace(/　/g, ' ') // eslint-disable-line no-irregular-whitespace
      .split(/\s/)
      .join('|')})`
    return new RegExp(`${r}`, 'gi')
  }
}
