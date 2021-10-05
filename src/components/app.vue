<template lang="pug">
.hoge page tree {{ root }}
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */

import { Component, Vue } from 'vue-property-decorator'

import { pageTree } from '@/store/page-tree'
import { Root } from '@/types'

@Component
export default class App extends Vue {
  mounted(): void {
    pageTree.restoreTree()
    setTimeout(pageTree.forceSyncTree, 1000 * 60 * 10)
  }

  get root(): Root | null {
    return pageTree.root
  }
}
</script>
