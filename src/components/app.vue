<template lang="pug">
#app(
  v-shortkey='shortkey'
  @shortkey='onShortkey',
  )

  notification-wrapper

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
      sync

      p.count(v-if='count') 全{{count}}件

      suggestion(v-for='(node, i) in nodeList' :key='i' :index='i' :node='node')

  confluence(:originalBody='originalBody')
  copied#copied(:text="shortLink", :show='showToast' @animationend='showToast = false' class='copied')
  buttons
</template>

<script lang="ts">
/* eslint-disable import/no-default-export */

import { Component, Vue } from 'vue-property-decorator'

import { DOMUtils } from '@/classes/utils'
import Buttons from '@/components/buttons.vue'
import Confluence from '@/components/confluence.vue'
import Copied from '@/components/copied.vue'
import NotificationWrapper from '@/components/notification-wrapper.vue'
import Overlay from '@/components/overlay.vue'
import Suggestion from '@/components/suggestion.vue'
import Sync from '@/components/sync.vue'
import { transitToEditPage } from '@/lib'
import { completions } from '@/store/completions'
import { overlay } from '@/store/overlay'
import { pageTree } from '@/store/page-tree'
import { Node, ShortKeyObject, ShortKey } from '@/types'

@Component({
  components: {
    NotificationWrapper,
    Suggestion,
    Confluence,
    Overlay,
    Copied,
    Sync,
    Buttons
  }
})
export default class App extends Vue {
  private originalBody: string | null = null
  private showToast = false

  mounted(): void {
    pageTree.restoreTree()
    setInterval(pageTree.restoreTree, 1000 * 60 * 10)
  }

  onShortkey(onoff: { srcKey: ShortKey }): void {
    switch (onoff.srcKey) {
      case 'meta+k':
      case 'meta+space':
      case 'ctrl+k':
      case 'ctrl+space':
        overlay.setDisplay(!overlay.display)
        break
      case 'esc':
        overlay.setDisplay(false)
        completions.changeQuery('')
        break
      case 'edit':
        transitToEditPage()
        break
      case 'copy-k':
      case 'copy-s':
        this.$copyText(DOMUtils.shortLink)
        this.showToast = true
        break
      case 'copy-page':
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        location.href = DOMUtils.getHref('#action-copy-page-link')!
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
    if (e.isComposing) {
      return
    }
    if (e.metaKey || e.ctrlKey) {
      window.open(completions.nodeList[completions.selectIndex].url, '_blank')
    } else {
      location.href = completions.nodeList[completions.selectIndex].url
    }
  }

  get shortkey(): ShortKeyObject {
    let defaultKeys: ShortKeyObject = {
      esc: ['esc'],
      'meta+space': ['meta', 'space'],
      'meta+k': ['meta', 'k'],
      'ctrl+space': ['ctrl', 'space'],
      'ctrl+k': ['ctrl', 'k']
    }

    if (!overlay.display) {
      return {
        ...defaultKeys,
        ...{ 'copy-s': ['s'], 'copy-k': ['k'], edit: ['e'], 'copy-page': ['p'] }
      }
    } else {
      return defaultKeys
    }
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
      return 'ページタイトルを入力して下さい'
    } else {
      return 'ページ情報を取得中です'
    }
  }

  get focus(): number {
    if (this.$refs.input) {
      // 一瞬でもタイムラグが無いとfocusされないためtimeoutしている
      setTimeout(() => {
        ;(this.$refs.input as HTMLInputElement).focus()
      }, 1)
    }
    return completions.focus
  }

  get shortLink(): string {
    return DOMUtils.shortLink
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
}
</style>
