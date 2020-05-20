export default {
  methods: {
    parseTree(doc) {
      return Array.from(doc.getElementsByTagName('li'), (li) => {
        const subTree = li.getElementsByClassName('plugin_pagetree_children_container')[0]
                          .getElementsByClassName('plugin_pagetree_children_list')[0];
        const link = li.getElementsByClassName('plugin_pagetree_children_content')[0];
        const pageId = link.getElementsByTagName('span')[0].id.match(/(\d+)/)[0];
        if (subTree) {
          subTree.id = `page-tree-root-${pageId}`;
        }
        const children = subTree ? this.parseTree(subTree) : null;
        const a = link.getElementsByTagName('a')[0];
        const linkText = a.innerText;
        const url = a.href;

        return { linkText, url, pageId, children };
      });
    }
  }
}
