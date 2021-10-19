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

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $copyText: (value: string) => void
  }
}

export type shortkeys = 'meta+k' | 'esc' | 'edit' | 'copy-s' | 'copy-k'
export type shortkeyObject = { [key: shortkeys]: string[] }
