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

export type Tree = Node & Omit<Root, 'timestamp'>

export interface Token {
  text: string
  bold: boolean = false
}
