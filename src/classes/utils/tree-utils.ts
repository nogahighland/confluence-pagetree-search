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
}
