<template>
  <ul>
    <li v-show='isLinkVisible' >
      <div class='tree-toggle' :class='toggleStatus' @click.prevent='toggleSubTree'></div>
      <a class='link' :class='toggleStatus' :title='linkText' :href='url'>{{ linkText }}</a>
    </li>

    <TreeNode v-show='isTreeVisible'
              v-for="child in children"
              :linkText="child.linkText"
              :url="child.url"
              :pageId="child.pageId"
              :children="child.children"
              :key="child.pageId"
              @openChild='openChild'
              />
  </ul>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'

export default {
  props: [ 'linkText', 'url', 'pageId', 'children'],
  name: 'TreeNode',

  data() {
    return { toggle: false }
  },

  mounted() {
    this.setToggle();
    this.scrollToCurrentPage();
  },

  computed: {
    ...mapState(['query', 'openNodeId', 'currentNodeId']),
    ...mapGetters(['queryRegexp']),

    isLinkVisible() {
      return this.url && !this.queryRegexp || (this.queryRegexp && this.queryRegexp.test(this.linkText))
    },

    isTreeVisible() {
      return this.queryRegexp || this.toggle;
    },

    toggleStatus() {
      const status = {
        expanded: false,
        collapsed: false,
        current: false,
      }

      if (this.children) {
        status.collapsed = !(status.expanded = this.toggle)
      }

      status.current = this.isCurrentPage;

      return status;
    },

    isCurrentPage() {
      return this.pageId == this.currentNodeId;
    }
  },

  methods: {
    toggleSubTree() {
      this.toggle = !this.toggle;
      if (this.toggle) {
        this.$emit('openChild');
      }
    },

    setToggle() {
      this.toggle = this.toggle || this.queryRegexp || this.pageId == this.currentNodeId;
      if (this.toggle) {
        this.$emit('openChild');
      }
    },

    openChild() {
      this.toggle = true;
      this.$emit('openChild');
    },

    scrollToCurrentPage() {
      if (this.isCurrentPage && !this.queryRegexp) {
        setTimeout(() => {
          this.$el.scrollIntoView({ block:'center' });
        }, 1)
      }
    }
  }
}
</script>

<style scoped lang='scss'>
ul {
  margin-left: 10px;
  width: 500px;
}
li {
  padding-bottom: 5px;
}
.tree-toggle {
  cursor: pointer;
  width: 16px;
  height: 16px;
  margin-right: 5px;
  float: left;
  content: ' ';
  border-radius: 50%;
  background-color: #BBB;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-top: 3px;
  color: white;
}
.tree-toggle:before {
  margin-top: -2px;
}
.tree-toggle.expanded:before {
  content: '-'
}
.tree-toggle.collapsed:before {
  content: '+'
}
.link.expanded,.link.current {
  font-weight: bold;
}
</style>
