const pascal     = '{{pascalCased}}';
const containers = `containers/${pascal}`;
const components = `components/${pascal}`;
const tiles      = `components/Tile/${pascal}`;
const screens    = `screens/${pascal}`;
const redux      = `redux/${pascal}`;
const toUpper    = text => text.replace(/([A-Z])/g, c => `_${c}`).toUpperCase();

module.exports = {
  appRoot     : __dirname + '/src',
  templateRoot: __dirname + '/internal/templates',
  tasks       : {

    // Dumps all the tasks to the cli. Useful for brain farts
    tasks: {
      task: () => {
        console.log('[Available tasks]: \n');
        console.log(Reflect.ownKeys(module.exports.tasks).sort().map(task => `- ${task}`).join('\n'), '\n');
      }
    },

    component: [
      { task: params => Object.assign(params, { dirUp: '' }) },
      { task: 'generate', target: `${components}/index.js`, template: 'component/index.hs' },
      { task: 'generate', target: `${components}/${pascal}.jsx`, template: 'component/component.hs' },
      { task: 'generate', target: `${components}/${pascal}.styles.js`, template: 'component/styles.hs' },
      { task: 'generate', target: `${components}/${pascal}.stories.jsx`, template: 'component/stories.hs' },
      { task: 'generate', target: `${components}/${pascal}.test.jsx`, template: 'component/test.hs' }
    ],

    tile: [
      { task: params => Object.assign(params, { dirUp: '../' }) },
      { task: 'generate', target: `${tiles}/index.js`, template: 'component/index.hs' },
      { task: 'generate', target: `${tiles}/${pascal}.jsx`, template: 'component/component.hs' },
      { task: 'generate', target: `${tiles}/${pascal}.styles.js`, template: 'component/styles.hs' },
      { task: 'generate', target: `${tiles}/${pascal}.stories.jsx`, template: 'component/stories.hs' },
      { task: 'generate', target: `${tiles}/${pascal}.test.jsx`, template: 'component/test.hs' }
    ],

    container: [
      { task: params => Object.assign(params, { dirUp: '' }) },
      { task: 'generate', target: `${containers}/index.js`, template: 'component/index.hs' },
      { task: 'generate', target: `${containers}/${pascal}.jsx`, template: 'component/container.hs' },
      { task: 'generate', target: `${containers}/${pascal}.styles.js`, template: 'component/styles.hs' },
      { task: 'generate', target: `${containers}/${pascal}.stories.jsx`, template: 'component/stories.hs' },
      { task: 'generate', target: `${containers}/${pascal}.test.jsx`, template: 'component/test.hs' }
    ],

    screen: [
      { task: 'generate', target: `${screens}/index.jsx`, template: 'screen/index.hs' },
      { task: 'generate', target: `${screens}/${pascal}.jsx`, template: 'screen/screen.hs' },
      { task: 'generate', target: `${screens}/${pascal}.styles.js`, template: 'screen/styles.hs' },
      {
        task  : 'modify',
        target: 'components/Root/Root.jsx',
        patch : [
          {
            pattern: /import.*?from '.\/screens\/.*?';\s/,
            append : `import ${pascal} from './screens/${pascal}';\n`
          },
          {
            pattern: /( *)<Route .*?\n(?!( *)<Route)/,
            custom : (match, spaces) => `${match}${spaces}<Route path="/{{ name }}" component={ ${pascal} } exact />\n`
          }
        ]
      }
    ],

    redux: [
      {
        task  : 'modify',
        target: 'redux/index.js',
        patch : [
          {
            pattern: /}\);\s*const store/,
            prepend: `  {{name}}: require('./${pascal}').reducer,\n`
          }
        ]
      },
      { task: 'generate', target: `${redux}/index.js`, template: 'redux/index.hs' },
      { definedTask: 'actions' },
      { definedTask: 'reducers' },
      { definedTask: 'state' },
      { definedTask: 'types' },
    ],

    actions: { task: 'generate', target: `${redux}/${pascal}.actions.js`, template: 'redux/actions.hs' },

    reducers: { task: 'generate', target: `${redux}/${pascal}.reducers.js`, template: 'redux/reducers.hs' },

    state: { task: 'generate', target: `${redux}/${pascal}.state.js`, template: 'redux/state.hs' },

    types: { task: 'generate', target: `${redux}/${pascal}.types.js`, template: 'redux/types.hs' },

    action: [
      { definedTask: 'type' },
      { definedTask: 'actionCreator' },
      { definedTask: 'reducer' },
      { definedTask: 'linkTypeReducer' },
    ],

    linkTypeReducer: [
      { definedTask: 'typeUpper' },
      {
        task  : 'modify',
        target: `${redux}/index.js`,
        patch : [
          {
            pattern: /}\);\s$/,
            prepend: '  [types.{{typeUpper}}]: reducers.{{type}},\n'
          }
        ]
      }
    ],

    type: [
      { definedTask: 'typeUpper' },
      {
        task  : 'modify',
        target: `${redux}/${pascal}.types.js`,
        patch : [
          {
            pattern: /\s$/,
            append : 'export const {{typeUpper}} = `${namespace}/{{typeUpper}}`;\n'
          }
        ]
      }
    ],

    actionCreator: [
      { definedTask: 'typeUpper' },
      {
        task  : 'modify',
        target: `${redux}/${pascal}.actions.js`,
        patch : [
          {
            pattern: /\s$/,
            append : '\nexport const {{type}} = () => ({type: types.{{typeUpper}}});\n'
          }
        ]
      }
    ],

    reducer: {
      task  : 'modify',
      target: `${redux}/${pascal}.reducers.js`,
      patch : [
        {
          pattern: /\s$/,
          append : '\nexport const {{type}} = state => state;\n'
        }
      ]
    },

    sagas: [
      { task: 'generate', target: `sagas/${pascal}.sagas.js`, template: 'sagas/sagas.hs' },
      {
        task  : 'modify',
        target: `sagas/index.js`,
        patch : [
          {
            pattern: /\nexport/,
            prepend: [
              `import * as ${pascal}Types from '../redux/${pascal}/${pascal}.types';`,
              `import * as ${pascal}Sagas from './${pascal}.sagas';`
            ].join('\n') + '\n'
          }
        ]
      }
    ],

    saga: [
      { definedTask: 'typeUpper' },
      {
        task  : 'modify',
        target: `sagas/index.js`,
        patch : [
          {
            pattern: /\s*]\);/,
            prepend: `\n    takeLatest(${pascal}Types.{{typeUpper}}, ${pascal}Sagas.{{type}}),`
          }
        ]
      },
      {
        task  : 'modify',
        target: `sagas/${pascal}.sagas.js`,
        patch : [
          {
            pattern: /\n$/,
            append : [ '', `export function * {{type}} (action) {`, `  yield true;`, `}`, '' ].join('\n')
          }
        ]
      }
    ],

    fullAction: [{ definedTask: 'action' }, { definedTask: 'saga' }],

    api: [
      { definedTask: 'typeUpper' },
      { definedTask: 'fullAction', sync: true },
      { definedTask: 'action', prepare: params => { params.type += 'Success'}, sync: true },
      { definedTask: 'action', prepare: params => { params.type += 'Failure'}, sync: true },
    ],

    // Utility tasks
    typeUpper: { task: parameters => Object.assign(parameters, { typeUpper: toUpper(parameters.type) }) },
  }
};
