<template lang="pug">
div
  .parents
    a.parent(v-for='(parent, i) in parents' :key='i' :href='parent.url') {{ parent.linkText }}
  .suggestion
    a(:href='node.url')
      token-part(v-for='(token, i) in tokens' :key='i' :token='token')
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */
import TokenPart from './token-part.vue'

import { Component, Vue, Prop } from 'vue-property-decorator'

import { SuggestionUtils } from '@/classes/utils/suggestion-utils'
import { completions } from '@/store/completions'
import { pageTree } from '@/store/page-tree'
import { Root, Token, Tree } from '@/types'
@Component({
  components: { TokenPart }
})
export default class Suggestion extends Vue {
  @Prop()
  private node!: Tree

  get tokens(): Token[] {
    if (!completions.queryGlobalRegexp) {
      return []
    }
    return SuggestionUtils.getTokens(
      this.node.linkText,
      completions.queryGlobalRegexp
    )
  }

  get parents(): Tree[] {
    const parents: Tree[] = []
    if (!pageTree.root) {
      return parents
    }
    let base: Root | Tree = pageTree.root
    this.node.address.forEach(i => {
      base = base.children![i]
      parents.push(base as Tree)
    })
    parents.pop()
    return parents
  }
}
</script>
