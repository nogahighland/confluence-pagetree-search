<template lang="pug">
.root
  .parents
    span.parent(v-for='(parent, i) in parents' :key='i')
      a(:href='parent.url') {{ parent.linkText }}
      span.arrow(v-if='i != parent.length - 1') >
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
    if (!completions.query) {
      return []
    }
    return SuggestionUtils.getTokens(
      this.node.linkText,
      SuggestionUtils.createEmphasizeRegexp(completions.query)
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

<style lang="scss" scoped>
.root {
  margin-bottom: 0.1em;
  border-top: dashed 1px #aaaaaa;
}
.parents {
  white-space: nowrap;
}
.parent {
  font-size: x-small;
  a {
    color: #aaaaaa !important;
  }
}
.arrow {
  margin: 0 0.3em;
}
.suggestion {
  font-size: small;
  white-space: nowrap;
}
</style>
