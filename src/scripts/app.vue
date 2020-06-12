<template>
  <div>
    <div class="input-container">
      <div>
        <label for='tree-incremental-search-input'>Tree Search</label>
        <font-awesome-icon @click='sync' :class='{ rotating: loading }' class='sync' icon="sync-alt"/>
      </div>
      <div>
        <input name='tree-incremental-search-input' @input='onQueryChange' type='text' autocomplete='off' />
      </div>
    </div>

    <TreeNode :children='nodeDataList' />
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import TreeNode from './components/tree-node'
import DomParse from './mixins/dom-parse'
import { mapState, mapActions } from 'vuex'
import { debounce } from 'lodash'

export default {
  mixins: [DomParse],

  data() {
    return {
      nodeDataList: [],
      loading: true,
    }
  },

  mounted() {
    this.setCurrentNodeId({ currentNodeId: this.currentNodeId });
    this.setOpenNodeId({ openNodeId: this.activeNodeId });
    this.hideOriginalPageTree();

    chrome.storage.local.get(this.rootId, (data) => {
      const spaceData = data[this.rootId];

      if (spaceData) {
        this.nodeDataList = spaceData.nodeDataList;
        this.loading = false;
      }

      if (!spaceData || (spaceData && moment(spaceData.timestamp).add(10, 'm') < moment())) {
        axios.get(this.treeUrl).then(this.setTreeData);
      }
    });
  },

  computed: {
    ...mapState(['query']),

    treeUrl() {
      return `/confluence/plugins/pagetree/naturalchildren.action?sort=position&hasRoot=true&pageId=${this.rootId}&startDepth=100`
    },

    rootId() {
      return document.querySelector('.plugin_pagetree > ul > div:first-child').id.match(/(\d+)/)[0];
    },

    activeNodeId() {
      return document.querySelector('head > meta[name=ajs-parent-page-id]').content;
    },

    currentNodeId() {
      return document.querySelector('head > meta[name=ajs-page-id]').content;
    }
  },

  methods: {
    ...mapActions(['setQuery', 'setOpenNodeId', 'setCurrentNodeId']),

    onQueryChange(e) {
      debounce(() => this.setQuery({ query: e.target.value }), 300)();
    },

    hideOriginalPageTree() {
      document.querySelectorAll('.acs-side-bar .page-tree, .acs-side-bar .plugin_pagetree').forEach(e => e.style.display = 'none');
    },

    setTreeData(response) {
      const tree = new DOMParser().parseFromString(response.data, 'text/html').body.firstChild;
      tree.id = 'page-tree-root'
      this.nodeDataList = this.parseTree(tree);

      const storedData = {};
      storedData[this.rootId] = { nodeDataList: this.nodeDataList, timestamp: moment().format() };

      chrome.storage.local.set(storedData);

      this.loading = false;
    },

    async sync() {
      this.loading = true;
      this.setTreeData(await axios.get(this.treeUrl));
    }
  },

  components: { TreeNode }
}
</script>

<style scoped lang="scss">
.input-container {
  margin: 10px;
}
input {
  width: 100%;
  height: 2.3em;
  border-radius: 3px;
  border: 1px solid #c1c7d0;
  margin: 10px 0px;
}
.sync {
  cursor: pointer;
}
.rotating {
  animation: r1 2s linear infinite;
}
@keyframes r1 {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
