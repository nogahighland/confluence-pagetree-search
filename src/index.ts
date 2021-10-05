import Vue, { VNode } from 'vue'

import App from '@/components/app.vue'
import { addTargetBlank } from '@/lib/'

const appElement = document.createElement('div')
appElement.id = 'page-tree-incremental-search'
const nav = document.querySelector('.acs-nav-sections')

if (nav && nav.parentNode) {
  addTargetBlank()
  nav.parentNode.insertBefore(appElement, nav.nextElementSibling)

  const app = new Vue({
    render: (h): VNode => h(App)
  }).$mount()

  appElement.appendChild(app.$el)
}
