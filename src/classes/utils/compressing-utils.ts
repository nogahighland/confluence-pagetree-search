import pako from 'pako'

import { Root } from '@/types'
export class CompressingUtils {
  static deflate(root: Root): string {
    const source = JSON.stringify(root)
    const compressed = pako.deflate(source, { to: 'string' })
    return compressed
  }

  static inflate(buffer: string): Root {
    const restored = pako.inflate(buffer, { to: 'string' })
    return JSON.parse(restored)
  }
}
