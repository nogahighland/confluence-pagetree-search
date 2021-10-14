import { Constants } from './classes/constants'
import { addTargetBlank } from './lib'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'

import App from '@/components/app.vue'

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

  appElement.appendChild(app.$el)
  document.body.appendChild(appElement)

  addTargetBlank()

  const originalHead = document.head.innerHTML
  document.head.innerHTML = ''
  document.head.innerHTML = originalHead
}
