/**
 * @import {Root, Paragraph} from 'mdast'
 */

import { visit } from "unist-util-visit";

// Based on https://github.com/kevinzunigacuellar/remark-code-title,
// with a reworked element structure with a more Docasaurus-like look.
const remarkCodeTitle = () => {
  /**
   * @param {Root} tree
   * @returns {void}
   */
  return (tree, file) => {
    visit(tree, "code", (node, index, parent) => {
      const metaString = `${node.lang ?? ""} ${node.meta ?? ""}`.trim();
      if (!metaString) return;
      const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? [
        "",
      ];
      if (!title && metaString.includes("title=")) {
        file.message("Invalid title", node, "remark-code-title");
        return;
      }
      if (!title) return;

      if (!node.data) {
        node.data = {};
      }

      if (!node.data.hProperties) {
        node.data.hProperties = {};
      }

      node.data.hProperties.title = title;
    });
  };
};

export default remarkCodeTitle;
