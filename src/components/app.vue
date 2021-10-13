<template lang="pug">
#app(v-shortkey='{ on:["meta", "k"], off:["esc"] }' @shortkey='switchVisibility')
  .overlay(:class='classes' @click.stop='switchVisibility')
    #confluence-pagetree-search
      label(for='tree-incremental-search-input') Tree Search
      font-awesome-icon(@click='sync' :class='{ rotating: !syncReady }' class='sync' icon="sync-alt")

      input(@input='onInput' :disabled='!syncReady' :placeholder='placeholder' name='tree-incremental-search-input' :values='focus' ref='aaa')
      p(v-if='count') 全{{count}}件
      suggestion(v-for='(node, i) in nodeList' :key='i' :node='node')
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

  switchVisibility(onoff: { srcKey: 'on' | 'off' }): void {
    switch (onoff.srcKey) {
      case 'on':
        this.display = !this.display
        break
      case 'off':
        this.display = false
        break
    }
    if (this.display) {
      completions.setFocus(this.display)
    }
  }

  onInput(e: InputEvent): void {
    if (e.target instanceof HTMLInputElement) {
      completions.changeQuery(e.target.value)
    }
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
    if (this.$refs.aaa) {
      setTimeout(() => {
        ;(this.$refs.aaa as HTMLInputElement).focus()
      }, 1)
    }
    return completions.focus
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
    width: 50%;
    margin: 0 auto;
    top: 100px;

    input {
      width: 100%;
      height: 3em;
      border-radius: 3px;
      border: 1px solid #c1c7d0;
      margin: 10px 0px;
      font-size: large;
    }

    .sync {
      cursor: pointer;
      margin-left: 0.5em;
    }
    .rotating {
      animation: r1 2s linear infinite;
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
