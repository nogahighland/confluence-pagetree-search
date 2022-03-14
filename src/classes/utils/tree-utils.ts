import { pageTree } from '@/store/page-tree'
import { Root, Tree } from '@/types'

export class TreeUtils {
  static extractNodeList(tree: Tree | Root): Tree[] | [] {
    let nodeList: Tree[] = []
    if (!tree.children) {
      return nodeList
    }
    nodeList = [
      ...tree.children,
      ...tree.children.flatMap(child => this.extractNodeList(child))
    ]
    return nodeList
  }

  static addBreadcrumb(root: Root | Tree): void {
    if (!root.children) {
      return
    }
    root.children.forEach(tree => {
      tree.breadcrumb = [
        ...this.getParents(tree).map(p => p.linkText),
        tree.linkText
      ].join(' ')
      this.addBreadcrumb(tree)
    })
  }

  static getParents(tree: Tree): Tree[] {
    const parents: Tree[] = []
    if (!pageTree.root) {
      return parents
    }
    let base: Root | Tree = pageTree.root
    tree.address.forEach(i => {
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      base = base.children![i]
      parents.push(base as Tree)
    })
    parents.pop()
    return parents
  }
}
