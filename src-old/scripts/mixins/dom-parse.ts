export default {
  methods: {
    parseTree: (doc: Document) :{} => {
      return Array.from(doc.querySelectorAll(`#${doc.id} > li`), (li) => {
        const subTree = li.querySelector('.plugin_pagetree_children_container > ul.plugin_pagetree_children_list');
        const link = li.querySelector('.plugin_pagetree_children_content');
        if (!link) {
        return
        }
        const pageId = link.querySelector('span').id.match(/(\d+)/)[0];
        if (subTree) {
          subTree.id = `page-tree-root-${pageId}`;
        }
        const children = subTree ? this.parseTree(subTree) : null;
        const a = link.querySelector('a');
        const linkText = a.innerText;
        const url = a.href;

        return { linkText, url, pageId, children }
      });
    }
  }
}
