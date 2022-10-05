export interface Root {
  children: Tree[] | null
  timestamp: number
}

interface Node {
  linkText: string
  breadcrumb?: string
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
    $copyText: (value: string) => Promise<void>
  }
}

export type ShortKey =
  | 'meta+k'
  | 'meta+space'
  | 'ctrl+k'
  | 'ctrl+space'
  | 'esc'
  | 'edit'
  | 'copy-s'
  | 'copy-k'
  | 'copy-page'

export type ShortKeyObject = {
  'meta+k'?: ['meta', 'k']
  'meta+space'?: ['meta', 'space']
  'ctrl+k'?: ['ctrl', 'k']
  'ctrl+space'?: ['ctrl', 'space']
  esc?: ['esc']
  edit?: ['e']
  'copy-s'?: ['s']
  'copy-k'?: ['k']
  'copy-page'?: ['p']
}

export type NotificationBody = {
  id: number
  iconUrl: string
  title: string
  description: string
  url: string
  globalId: string
  metadata: {
    user: string
    username: string
    pageId: number
    itemContentId: number
    contentId: number
    contentVersion: number
    watching: boolean
    like: boolean
  }
  created: number
  updated: number
  status: string
  read: boolean
  pinned: boolean
}

export type Notification = {
  item: {
    title: string
    url: string
    applicationLinkId: string
    application: string
    entity: 'page' | 'issue' | 'comment'
    action: string
    pinned: boolean
    aggregateKey: string
  }
  notifications: NotificationBody[]
}
