import { Constants } from './classes/constants'
import { DOMUtils } from './classes/utils'
import { addTargetBlank } from './lib'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'

import App from '@/components/app.vue'

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const VueShortKey = require('vue-shortkey')

library.add(faSyncAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueShortKey)

const nav = document.querySelector('.acs-nav-sections')

if (nav && nav.parentNode) {
  const appElement = document.createElement('div')
  Constants.init()
  const originalBody = document.body.innerHTML
  document.body.innerHTML = ''

  const app = new App({
    data: { originalBody }
  }).$mount()

  // shorkeyをbody全体に効かせるために元のHTMLをVueのコンポーネント化する
  appElement.appendChild(app.$el)
  document.body.appendChild(appElement)

  // HTMLを埋め込み直した後に各種機能を復活させる
  // document.head.innerHTMLで元の<head>を差し込み直すだけではscriptが読み込み直されなかった
  if (DOMUtils.scripts) {
    document.head.append(...DOMUtils.scripts)
  }
  addTargetBlank()
}
