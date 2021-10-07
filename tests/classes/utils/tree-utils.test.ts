import { root } from './fixtures'

import { TreeUtils } from '@/classes/utils/tree-utils'

describe(TreeUtils, () => {
  it('', () => {
    const nodeList = TreeUtils.extractNodeList(root)
    expect(nodeList.length).toEqual(4)
    expect(nodeList[0].linkText).toEqual('linkText1')
    expect(nodeList[1].linkText).toEqual('linkText2')
    expect(nodeList[2].linkText).toEqual('linkText1-1')
    expect(nodeList[3].linkText).toEqual('linkText1-1-1')
  })
})
