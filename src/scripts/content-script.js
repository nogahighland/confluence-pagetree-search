import Vue from 'vue';
import App from './app'
import store from './store'

const appElement = document.createElement('div');
appElement.id = 'page-tree-incremental-search';
const nav = document.querySelector('.acs-nav-sections');

if (nav) {
  nav.parentNode.insertBefore(appElement, nav.nextElementSibling);

  const app = new Vue({
    store,
    render: h => h(App),
  }).$mount();

  appElement.appendChild(app.$el)

  // ついで
  document.querySelectorAll('a').forEach(e => e.target = '_blank');
}
