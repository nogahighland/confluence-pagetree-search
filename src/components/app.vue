<template lang="pug">
#app(v-shortkey='{ on:["meta", "k"], off:["esc"] }' @shortkey='onShortkey')
  .overlay(:class='classes' @click.stop='onOverlayClick')
    #confluence-pagetree-search(@click.stop)
      input(
        name='tree-incremental-search-input'
        ref='input'
        :disabled='!syncReady'
        :placeholder='placeholder'
        :values='focus'
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
import Suggestion from '@/components/suggestion.vue'
import { completions } from '@/store/completions'
import { pageTree } from '@/store/page-tree'
import { Node } from '@/types'

@Component({
  components: { Suggestion, Confluence }
})
export default class App extends Vue {
  private originalBody: string | null = null
  private display = false

  mounted(): void {
    pageTree.restoreTree()
    setInterval(pageTree.restoreTree, 1000 * 60 * 10)
  }

  sync(): void {
    pageTree.forceSyncTree()
  }

  get classes(): { [key: string]: boolean } {
    return { 'search-on': this.display, 'search-off': !this.display }
  }

  onShortkey(onoff: { srcKey: 'on' | 'off' }): void {
    switch (onoff.srcKey) {
      case 'on':
        this.display = !this.display
        break
      case 'off':
        this.display = false
        break
    }
    completions.setFocus(this.display)
  }

  onOverlayClick(): void {
    this.display = !this.display
    completions.setFocus(this.display)
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
.search-off {
  display: none;
}

.search-on {
  display: block;
}

.overlay {
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.3);
  position: absolute;
  z-index: 11; // サイドバーより上
  padding-top: 100px;

  #confluence-pagetree-search {
    width: 40%;
    margin: 0 auto;
    top: 100px;
    background-color: #ffffff;
    border-radius: 10px;
    padding-bottom: 10px;

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
}
</style>
