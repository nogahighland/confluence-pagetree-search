import { library } from '@fortawesome/fontawesome-svg-core'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue, { VNode } from 'vue'

import App from '@/components/app.vue'
import { addTargetBlank, hideOriginalPageTree } from '@/lib/'

library.add(faSyncAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

const appElement = document.createElement('div')
appElement.id = 'page-tree-incremental-search'
const nav = document.querySelector('.acs-nav-sections')

if (nav && nav.parentNode) {
  addTargetBlank()
  hideOriginalPageTree()
  nav.parentNode.insertBefore(appElement, nav.nextElementSibling)

  const app = new Vue({
    render: (h): VNode => h(App)
  }).$mount()

  appElement.appendChild(app.$el)
}
