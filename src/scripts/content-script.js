import Vue from 'vue';
import VueAnalytics from 'vue-analytics'
import App from './app'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import addTargetBlank from './lib/add-target-blank'

library.add(faSyncAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueAnalytics, { id: 'UA-159415435-1', debug: { enabled: true, trace: true }})

const appElement = document.createElement('div');
appElement.id = 'page-tree-incremental-search';
const nav = document.querySelector('.acs-nav-sections');

if (nav) {
  addTargetBlank()
  nav.parentNode.insertBefore(appElement, nav.nextElementSibling);

  const app = new Vue({
    store,
    render: h => h(App),
  }).$mount();

  appElement.appendChild(app.$el)
}
