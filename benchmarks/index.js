const benchmark = require('benchmark');
const getFamilyTree = require('./lib/index').default;
const sample = require('../samples/average-tree.json');

const DEFAULT_ROOT_ID = 'kuVISwh7w';
const SIMPLE_ROOT_ID = 'vRSjcaDGj';

function run(nodes) {
  new benchmark.Suite('relatives-tree benchmark')
    .add('Default', function () {
      getFamilyTree(nodes, { rootId: DEFAULT_ROOT_ID });
    })
    .add('Simple', function () {
      getFamilyTree(nodes, { rootId: SIMPLE_ROOT_ID });
    })
    .on('cycle', (event) => console.log('> ' + String(event.target)))
    .on('error', (event) => console.log(event.target.error.message))
    .run();
}

run(sample);
