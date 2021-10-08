<template lang="pug">
div
  input(@input='onInput' :disabled='!syncReady')
  suggestion(v-for='(node, i) in nodeList' :key='i' :node='node')
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */

import { Component, Vue } from 'vue-property-decorator'

import Suggestion from '@/components/suggestion.vue'
import { completions } from '@/store/completions'
import { pageTree } from '@/store/page-tree'
import { Node } from '@/types'

@Component({
  components: { Suggestion }
})
export default class App extends Vue {
  mounted(): void {
    pageTree.restoreTree()
    setInterval(pageTree.forceSyncTree, 1000 * 60 * 10)
  }

  onInput(e: InputEvent): void {
    if (e.target instanceof HTMLInputElement) {
      completions.changeQuery(e.target.value)
    }
  }

  get nodeList(): Node[] {
    return completions.nodeList
  }
  get syncReady(): boolean {
    return pageTree.syncReady
  }
}
</script>
