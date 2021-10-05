export interface Root {
  children: Node[] | null
}

interface Node {
  linkText: string
  url: string
  pageId: string
  address: number[]
}

export type Tree = Root & Node
