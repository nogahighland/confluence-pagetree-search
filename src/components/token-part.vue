<template lang="pug">
span(:class='classes') {{ token.text }}
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */
import { Component, Vue, Prop } from 'vue-property-decorator'

import { Token } from '@/types'
@Component
export default class TokenPart extends Vue {
  @Prop()
  private token!: Token

  get classes(): { [key: string]: boolean } {
    return { bold: this.token.bold }
  }
}
</script>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}
</style>
