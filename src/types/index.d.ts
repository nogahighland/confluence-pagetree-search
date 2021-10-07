export interface Root {
  children: Tree[] | null
  timestamp: number
}

interface Node {
  linkText: string
  url: string
  pageId: string
  address: number[]
}

export type Tree = Root & Node
