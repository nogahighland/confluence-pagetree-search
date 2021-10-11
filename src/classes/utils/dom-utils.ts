import faker from 'faker'

import { Tree } from '@/types'

export class DOMUtils {
  static get treeUrl(): string {
    return `/confluence/plugins/pagetree/naturalchildren.action?sort=position&hasRoot=true&pageId=${this.rootId}&startDepth=100`
  }

  static get rootId(): string {
    const rootIdDiv = document.querySelector(
      '.plugin_pagetree > ul > div:first-child'
    ) as HTMLDivElement

    if (rootIdDiv && rootIdDiv.id) {
      const match = rootIdDiv.id.match(/(\d+)/)
      if (match) {
        return match[0]
      } else {
        throw new Error('root idが見つかりません')
      }
    } else {
      throw new Error('root idが見つかりません')
    }
  }

  static get activeNodeId(): string {
    return (document.querySelector(
      'head > meta[name=ajs-parent-page-id]'
    ) as HTMLMetaElement).content
  }

  static get currentNodeId(): string {
    return (document.querySelector(
      'head > meta[name=ajs-page-id]'
    ) as HTMLMetaElement).content
  }

  static parseTree(
    doc: HTMLUListElement,
    parentAddress: number[] = []
  ): Tree[] {
    const list = doc.querySelectorAll(`#${doc.id} > li`) as NodeListOf<
      HTMLLIElement
    >

    return Array.from(
      list,
      (li, i): Tree => {
        const { pageId, link, subTree } = this.extractSubTree(li)
        let children = null
        if (subTree) {
          subTree.id = `page-tree-root-${pageId}`
          children = this.parseTree(subTree, [...parentAddress, i])
        }

        const a = link.querySelector('a') as HTMLAnchorElement
        const { linkText, url } = this.extractAnchor(a)

        return {
          linkText: process.env.STORE ? this.randomName : linkText,
          url,
          pageId,
          children,
          address: [...parentAddress, i],
          timestamp: new Date().getTime()
        }
      }
    )
  }

  private static extractSubTree(
    li: HTMLLIElement
  ): {
    subTree: HTMLUListElement | null
    pageId: string
    link: HTMLDivElement
  } {
    const link = li.querySelector(
      '.plugin_pagetree_children_content'
    ) as HTMLDivElement

    const span = link.querySelector('span') as HTMLSpanElement
    const match = span.id.match(/(\d+)/) as RegExpMatchArray
    const pageId = match[0]

    const subTree = li.querySelector(
      '.plugin_pagetree_children_container > ul.plugin_pagetree_children_list'
    ) as HTMLUListElement
    if (subTree) {
      subTree.id = `page-tree-root-${pageId}`
    }

    return { subTree, pageId, link }
  }

  private static extractAnchor(
    a: HTMLAnchorElement
  ): { linkText: string; url: string } {
    const linkText = a.innerText
    const url = a.href

    return { linkText, url }
  }

  private static get randomName(): string {
    return faker.lorem.words()
  }
}
