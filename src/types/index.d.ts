export interface Root {
  children: Node[] | null
  timestamp: number
}

interface Node {
  linkText: string
  url: string
  pageId: string
  address: number[]
}

export type Tree = Root & Node
