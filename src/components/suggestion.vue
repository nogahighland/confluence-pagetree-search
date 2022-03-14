<template lang="pug">
.root(:class='rootClasses')
  .parents
    span.parent(v-for='(parent, i) in parents' :key='i')
      a(:href='parent.url')
        token-part(v-for='(token, i) in getTokens(parent.linkText)' :key='i' :token='token')
      span.arrow(v-if='i != parent.length - 1') >
  .suggestion
    a(:href='node.url')
      token-part(v-for='(token, i) in getTokens(node.linkText)' :key='i' :token='token')
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */
import TokenPart from './token-part.vue'

import { Component, Vue, Prop } from 'vue-property-decorator'

import { SuggestionUtils } from '@/classes/utils/suggestion-utils'
import { TreeUtils } from '@/classes/utils/tree-utils'
import { completions } from '@/store/completions'
import { Token, Tree } from '@/types'
@Component({
  components: { TokenPart }
})
export default class Suggestion extends Vue {
  @Prop()
  private node!: Tree
  @Prop()
  private index!: number

  getTokens(text: string): Token[] {
    if (!completions.query) {
      return []
    }
    return SuggestionUtils.getTokens(
      text,
      SuggestionUtils.createEmphasizeRegexp(completions.query)
    )
  }

  get parents(): Tree[] {
    return TreeUtils.getParents(this.node)
  }

  get rootClasses(): { focused: boolean } {
    return { focused: completions.selectIndex == this.index }
  }
}
</script>

<style lang="scss" scoped>
.root {
  min-height: 3em;
  display: flex;
  align-content: center;
  flex-flow: column;
  justify-content: center;
  font-size: larger;
  padding: 0.2em 0.7em 0;

  .root:hover {
    background-color: #eaeaea;
  }

  .parents {
    white-space: nowrap;
    overflow: hidden;

    .parent {
      font-size: small;
      a {
        color: #aaaaaa !important;
      }
    }
    .arrow {
      margin: 0 0.3em;
    }
  }

  .suggestion {
    white-space: nowrap;
    overflow: hidden;
  }
}

.focused {
  background-color: #e9e9e9;
}
</style>
