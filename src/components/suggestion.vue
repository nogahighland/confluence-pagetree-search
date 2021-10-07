<template lang="pug">
li {{ node.linkText }}
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */
import { Component, Vue, Prop } from 'vue-property-decorator'

import { SuggestionUtils } from '@/classes/utils/suggestion-utils'
import { completions } from '@/store/completions'
import { Token, Tree } from '@/types'
@Component
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
}
</script>
