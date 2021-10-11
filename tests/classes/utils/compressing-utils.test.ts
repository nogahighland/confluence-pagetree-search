import { root } from './fixtures'

import { CompressingUtils } from '@/classes/utils/compressing-utils'

describe(CompressingUtils, () => {
  const buffer = Buffer.from(JSON.stringify(root))
  it('', () => {
    expect(buffer.byteLength).toEqual(464)
    const compressed = CompressingUtils.deflate(root)
    expect(Buffer.from(compressed).byteLength).toEqual(194)
    const restored = CompressingUtils.inflate(compressed)
    expect(restored).toEqual(root)
  })
})
