const pascal = '{{pascalCased}}';
const containers = `containers/${pascal}`;
const components = `components/${pascal}`;
const tiles = `components/Tile/${pascal}`;
const screens = `screens/${pascal}`;
const redux = `redux/${pascal}`;

module.exports = {
  // Where will you keep your boilerplate templates?
  templateRoot: __dirname + '/templates/vd',

  tasks: {
    // Dumps all the tasks to the cli.
    tasks: {
      task: () => {
        console.log('[Available tasks]: \n');

        console.log(Reflect.ownKeys(module.exports.tasks).sort().map(task => `- ${task}`).join('\n'), '\n');
      },
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
        task: 'modify',
        target: 'components/Root/Root.jsx',
        patch: [
          {
            pattern: /import.*?from '..\/..\/screens\/.*?';\s/,
            append: `import ${pascal} from '../../screens/${pascal}';\n`
          },
          {
            pattern: /( *)<Route .*?\n(?!( *)<Route)/,
            custom: (match, spaces) => `${spaces}<Route path="/{{ name }}" component={${pascal}} exact />\n${match}`
          }
        ]
      }
    ],

    redux: [
      {
        task: 'modify',
        target: 'redux/index.js',
        patch: [
          {
            pattern: /}\);\s*const store/,
            prepend: `  {{name}}: require('./${pascal}').reducer,\n`
          }
        ]
      },
      { task: 'generate', target: `${redux}/index.js`, template: 'redux/index.hs' },
      { definedTask: 'vd:actions' },
      { definedTask: 'vd:reducers' },
      { definedTask: 'vd:state' },
      { definedTask: 'vd:types' },
    ],

    actions: { task: 'generate', target: `${redux}/${pascal}.actions.js`, template: 'redux/actions.hs' },

    reducers: { task: 'generate', target: `${redux}/${pascal}.reducers.js`, template: 'redux/reducers.hs' },

    state: { task: 'generate', target: `${redux}/${pascal}.state.js`, template: 'redux/state.hs' },

    types: { task: 'generate', target: `${redux}/${pascal}.types.js`, template: 'redux/types.hs' },

    action: [
      { definedTask: 'vd:type' },
      { definedTask: 'vd:actionCreator' },
      { definedTask: 'vd:reducer' },
      { definedTask: 'vd:linkTypeReducer' },
    ],

    linkTypeReducer: [
      { definedTask: 'vd:typeUpper' },
      {
        task: 'modify',
        target: `${redux}/index.js`,
        patch: [
          {
            pattern: /}\);\s$/,
            prepend: '  [types.{{typeUpper}}]: reducers.{{type}},\n'
          }
        ]
      }
    ],

    type: [
      { definedTask: 'vd:typeUpper' },
      {
        task: 'modify',
        target: `${redux}/${pascal}.types.js`,
        patch: [
          {
            pattern: /\s$/,
            append: 'export const {{typeUpper}} = `${namespace}/{{typeUpper}}`;\n'
          }
        ]
      }
    ],

    actionCreator: [
      { definedTask: 'vd:typeUpper' },
      {
        task: 'modify',
        target: `${redux}/${pascal}.actions.js`,
        patch: [
          {
            pattern: /\s$/,
            append: '\nexport const {{type}} = () => ({type: types.{{typeUpper}}});\n'
          }
        ]
      }
    ],

    reducer: {
      task: 'modify',
      target: `${redux}/${pascal}.reducers.js`,
      patch: [
        {
          pattern: /\s$/,
          append: '\nexport const {{type}} = state => state;\n'
        }
      ]
    },

    sagas: [
      { task: 'generate', target: `sagas/${pascal}.sagas.js`, template: 'sagas/sagas.hs' },
      {
        task: 'modify',
        target: `sagas/index.js`,
        patch: [
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
      { definedTask: 'vd:typeUpper' },
      {
        task: 'modify',
        target: `sagas/index.js`,
        patch: [
          {
            pattern: /\s*]\);/,
            prepend: `\n    takeLatest(${pascal}Types.{{typeUpper}}, ${pascal}Sagas.{{type}}),`
          }
        ]
      },
      {
        task: 'modify',
        target: `sagas/${pascal}.sagas.js`,
        patch: [
          {
            pattern: /\n$/,
            append: ['', `export function * {{type}} (action) {`, `  yield true;`, `}`, ''].join('\n')
          }
        ]
      }
    ],

    fullAction: [{ definedTask: 'vd:action' }, { definedTask: 'vd:saga' }],

    api: [
      { definedTask: 'vd:typeUpper' },
      { definedTask: 'vd:fullAction', sync: true },
      { definedTask: 'vd:action', prepare: params => { params.type += 'Success' }, sync: true },
      { definedTask: 'vd:action', prepare: params => { params.type += 'Failure' }, sync: true },
    ],

    // Utility tasks
    typeUpper: { task: parameters => Object.assign(parameters, { typeUpper: parameters.type.replace(/([A-Z])/g, c => `_${c}`).toUpperCase() }) },
  }
};
