import { Root, Tree } from '@/types'
/* eslint-disable camelcase*/
const child1_1_1: Tree = {
  linkText: 'linkText1-1-1',
  url: 'url1-1-1',
  address: [0, 1, 1, 1],
  pageId: 'pageId1-1-1',
  children: []
}

const child1_1: Tree = {
  linkText: 'linkText1-1',
  url: 'url1-1',
  address: [0, 1, 1],
  pageId: 'pageId1-1',
  children: [child1_1_1]
}

const child1: Tree = {
  linkText: 'linkText1',
  url: 'url1',
  address: [0, 1],
  pageId: 'pageId1',
  children: [child1_1]
}

const child2: Tree = {
  linkText: 'linkText2',
  url: 'url2',
  address: [0, 2],
  pageId: 'pageId2',
  children: []
}

export const root: Root = {
  children: [child1, child2],
  timestamp: 100
}
