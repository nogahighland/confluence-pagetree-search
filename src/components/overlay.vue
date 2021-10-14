<template lang="pug">
  .overlay(:class='classes' @click.stop='onClick')
    slot
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */
import { Component, Vue } from 'vue-property-decorator'

import { completions } from '@/store/completions'
import { overlay } from '@/store/overlay'
@Component({})
export default class Overlay extends Vue {
  private display = false

  onClick(): void {
    overlay.setDisplay(!overlay.display)
    completions.setFocus(this.display)
  }

  get classes(): { [key: string]: boolean } {
    return { 'search-on': overlay.display, 'search-off': !overlay.display }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.3);
  position: fixed;
  z-index: 101; // ヘッダーより上
  padding-top: 100px;
}

.search-off {
  display: none;
}

.search-on {
  display: block;
}
</style>
