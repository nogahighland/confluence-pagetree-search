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
        tokens.push({
          text: text.slice(prevIndex, token.length),
          bold: false
        })
        tokens.push({
          text: token,
          bold: true
        })
      }
      prevIndex = m.index! + token.length
    })

    if (prevIndex < text.length) {
      tokens.push({ text: text.slice(prevIndex), bold: false })
    }
    return tokens
  }
}
