<template lang="pug">
#app(v-shortkey='{ "meta+k":["meta", "k"], esc:["esc"] }' @shortkey='onShortkey')
  overlay
    #confluence-pagetree-search(@click.stop)
      input(
        name='tree-incremental-search-input'
        ref='input'
        :disabled='!syncReady'
        :placeholder='placeholder'
        :values='focus'
        :value='query'
        autocomplete='off'
        @input='onInput'
        @keydown.down='onDown'
        @keydown.up='onUp'
        @keydown.enter='onEnter'
      )
      .sync-container
        font-awesome-icon.sync(@click='sync' :class='{ rotating: !syncReady }' icon="sync-alt")

      p.count(v-if='count') 全{{count}}件

      suggestion(v-for='(node, i) in nodeList' :key='i' :index='i' :node='node')
  confluence(:originalBody='originalBody')
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */

import { Component, Vue } from 'vue-property-decorator'

import Confluence from '@/components/confluence.vue'
import Overlay from '@/components/overlay.vue'
import Suggestion from '@/components/suggestion.vue'
import { completions } from '@/store/completions'
import { overlay } from '@/store/overlay'
import { pageTree } from '@/store/page-tree'
import { Node } from '@/types'

@Component({
  components: { Suggestion, Confluence, Overlay }
})
export default class App extends Vue {
  private originalBody: string | null = null

  mounted(): void {
    pageTree.restoreTree()
    setInterval(pageTree.restoreTree, 1000 * 60 * 10)
  }

  sync(): void {
    pageTree.forceSyncTree()
  }

  onShortkey(onoff: { srcKey: 'meta+k' | 'esc' }): void {
    switch (onoff.srcKey) {
      case 'meta+k':
        overlay.setDisplay(!overlay.display)
        break
      case 'esc':
        overlay.setDisplay(false)
        completions.changeQuery('')
        break
    }
    completions.setFocus(overlay.display)
  }

  onInput(e: InputEvent): void {
    if (e.target instanceof HTMLInputElement) {
      completions.changeQuery(e.target.value)
    }
  }

  onDown(): void {
    completions.incrementSelectIndex()
  }

  onUp(): void {
    completions.decrementSelectIndex()
  }

  onEnter(e: KeyboardEvent): void {
    // 日本語確定は229
    if (e.keyCode != 13) {
      return
    }
    location.href = completions.nodeList[completions.selectIndex].url
  }

  get query(): string | null {
    return completions.query
  }

  get nodeList(): Node[] {
    return completions.nodeList
  }

  get syncReady(): boolean {
    return pageTree.syncReady
  }

  get count(): number {
    return completions.allNodeListCount
  }

  get placeholder(): string {
    if (this.syncReady) {
      return 'キーワードを入力して下さい'
    } else {
      return 'ページ情報を取得中です'
    }
  }

  get focus(): number {
    if (this.$refs.input) {
      setTimeout(() => {
        ;(this.$refs.input as HTMLInputElement).focus()
      }, 1)
    }
    return completions.focus
  }

  get selectIndex(): number {
    return completions.selectIndex
  }
}
</script>

<style lang="scss" scoped>
#confluence-pagetree-search {
  margin: 0 auto;
  top: 100px;
  background-color: #ffffff;
  border-radius: 10px;
  padding-bottom: 10px;
  box-shadow: 0 0 8px gray;
  @media screen and (min-width: 480px) {
    width: 90%;
  }
  @media screen and (min-width: 480px) and (max-width: 1500px) {
    width: 60%;
  }
  @media screen and (min-width: 1500px) {
    width: 40%;
  }

  input {
    width: 100%;
    height: 2.5em;
    margin: 10px 0;
    border: none;
    font-size: x-large;
    padding: 0 1em;
    font-weight: bolder;
    box-sizing: border-box;
  }
  input:focus,
  input:focus-visible {
    outline: none !important;
    box-shadow: none !important;
  }
  .count {
    margin-left: 1em;
  }
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
}
</style>
