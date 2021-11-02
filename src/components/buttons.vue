<template lang="pug">
#buttons
  .wrapper
    button.aui-button.aui-style.aui-button-primary(@click='clickEdit') 編集(E)
    button.aui-button.aui-style.aui-button-primary(@click='clickCopy') コピー(P)
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Vue } from 'vue-property-decorator'

import { DOMUtils } from '@/classes/utils'

@Component({})
export default class Buttons extends Vue {
  clickEdit(e: PointerEvent): void {
    const url = DOMUtils.getHref('#editPageLink')!
    if (e.metaKey) {
      window.open(url, '_blank')
    } else {
      location.href = url
    }
  }

  clickCopy(e: PointerEvent): void {
    const url = DOMUtils.getHref('#action-copy-page-link')!
    if (e.metaKey) {
      window.open(url, '_blank')
    } else {
      location.href = url
    }
  }
}
</script>

<style lang="scss" scoped>
#buttons {
  background-color: #ffffff;
  position: fixed;
  bottom: 0px;
  display: flex;
  width: 100%;
  justify-content: end;
  justify-items: center;
  z-index: 13;
  padding: 10px 0;
  box-shadow: 0 0 2px gray;
}

.wrapper {
  margin-right: 10px;
}
</style>
