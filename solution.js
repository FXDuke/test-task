function drawNestedSetsTree(data, node) {
  const ul = document.createElement('ul');

  function nodeHasChildren(node) {
    return node.right - node.left == 1 ? false : true;
  }

  function getChildren(arr, node) {
    const children = [];
    let childIndex = node.left + 1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].left == childIndex) {
        children.push(arr[i]);
        childIndex = arr[i].right + 1;
      }
    }
    return children;
  }

  // sort data by { left }
  data.sort((objA, objB) => {
    return objA.left - objB.left;
  });

  const addNodesInHTML = (arr, nodes) => {
    return nodes.map((node) => {
      if (nodeHasChildren(node)) {
        const children = getChildren(arr, node);
        if (children.length > 0) {
          return `<li>${node.title}<ul>${addNodesInHTML(arr, children)}</ul></li>`;
        }
      } else {
        return `<li>${node.title}</li>`;
      }
    }).join('');
  };

  ul.innerHTML = addNodesInHTML(data, [data[0]]);
  node.appendChild(ul);
}

if (typeof module !== 'undefined') {
  module.exports = drawNestedSetsTree;
}