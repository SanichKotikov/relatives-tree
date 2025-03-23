# relatives-tree

A tiny library (~3.23 kB) for calculating JSON data to family tree nodes and connectors.

🖥 [DEMO APP](https://sanichkotikov.github.io/react-family-tree-example/)

## Installation

```bash
npm i relatives-tree
```

## Usage

```typescript
import calcTree, { type Node } from 'relatives-tree';

const nodes: Node[] = [
  {
    id: "1",
    gender: "male",
    spouses: [],
    siblings: [],
    parents: [],
    children: [
      { id: "2", type: "blood" },
      { id: "3", type: "blood" }
    ]
  },
  {
    id: "2",
    gender: "female",
    spouses: [],
    siblings: [],
    parents: [{ id: "1", type: "blood" }],
    children: []
  },
  {
    id: "3",
    gender: "male",
    spouses: [],
    siblings: [],
    parents: [{ id: "1", type: "blood" }],
    children: []
  }
];

const tree = calcTree(nodes, { rootId: "1" });

render(tree);
```

## Rendering Examples

🛠 [Canvas example](/docs)  
🛠️ [React example](https://github.com/SanichKotikov/react-family-tree)  
🛠️ [Solid example](https://github.com/SanichKotikov/solid-family-tree-example)

## Input Data Structure

📝 [JSON EXAMPLES](/samples)

## Contributing

Please read [this documentation](https://github.com/SanichKotikov/contributing) before contributing.

## License

MIT
