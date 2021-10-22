<template lang="pug">
.sync-container
  font-awesome-icon.sync(@click='sync' :class='{ rotating: !syncReady }' icon="sync-alt")
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */
import { Component, Vue } from 'vue-property-decorator'

import { pageTree } from '@/store/page-tree'

@Component({})
export default class Sync extends Vue {
  sync(): void {
    pageTree.forceSyncTree({ disableSearch: true })
  }

  get syncReady(): boolean {
    return pageTree.syncReady
  }
}
</script>

<style lang="scss" scoped>
.sync-container {
  height: 25px;
  text-align: end;
  padding-right: 10px;
  .sync {
    cursor: pointer;
    margin-left: 0.5em;
  }
  .rotating {
    animation: r1 2s linear infinite;
  }
}

@keyframes r1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
