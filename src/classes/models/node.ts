import { pageTree } from '@/store/page-tree'
import { Node, Root, Tree } from '@/types'

export class NodeModel implements Node {
  constructor(
    public linkText: string,
    public url: string,
    public pageId: string,
    public address: number[]
  ) {}

  static toModel(node: Node): NodeModel {
    return new NodeModel(node.linkText, node.url, node.pageId, node.address)
  }

  toInterface(): Tree {
    return {
      linkText: this.linkText,
      url: this.url,
      pageId: this.pageId,
      address: this.address,
      children: null
    }
  }

  isMatch(regexp: RegExp): boolean {
    const text = this.parents.map(p => p.linkText).join(' ') + this.linkText
    console.log({ text })
    return regexp.test(text)
  }

  private get parents(): Tree[] {
    const parents: Tree[] = []
    if (!pageTree.root) {
      return parents
    }
    let base: Root | Tree = pageTree.root
    this.address.forEach(i => {
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      base = base.children![i]
      parents.push(base as Tree)
    })
    parents.pop()
    return parents
  }
}
