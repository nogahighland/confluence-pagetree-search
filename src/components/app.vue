<template lang="pug">
.hoge page tree {{ query }}
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */

import { Component, Prop, Vue } from 'vue-property-decorator'

import { pageTree } from '@/store/page-tree'
@Component
export default class App extends Vue {
  get query(): string | null {
    return pageTree.query
  }

  mounted(): void {
    setTimeout(() => {
      pageTree.setQuery('iiiiii')
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
div {
  border-color: solid 1px #000;
}
</style>
