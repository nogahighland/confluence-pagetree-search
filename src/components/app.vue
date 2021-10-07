<template lang="pug">
div
  input(@input='onInput')
  li(v-for='(node, i) in nodeList' :key='i') {{ node.linkText }}
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */

import { Component, Vue } from 'vue-property-decorator'

import { completions } from '@/store/completions'
import { pageTree } from '@/store/page-tree'
import { Node } from '@/types'

@Component
export default class App extends Vue {
  mounted(): void {
    pageTree.restoreTree()
    setTimeout(pageTree.forceSyncTree, 1000 * 60 * 10)
  }

  onInput(e: InputEvent): void {
    if (e.target instanceof HTMLInputElement) {
      completions.changeQuery(e.target.value)
    }
  }

  get nodeList(): Node[] {
    return completions.nodeList
  }
}
</script>
