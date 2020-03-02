const pascal = '{{pascalCased}}';
const containers = `containers/${pascal}`;
const tiles = `components/Tile/${pascal}`;
const screens = `screens/${pascal}`;
const redux = `redux/${pascal}`;

module.exports = {
  // Where will you keep your boilerplate templates?
  templateRoot: __dirname + '/templates/vd',

  parameters: {
    componentsPath: `components/${pascal}`,
    rootComponentPath: 'components/Root/Root.jsx',
  },

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
      { task: 'generate', target: `{{componentsPath}}/index.js`, template: 'component/index.hs' },
      { task: 'generate', target: `{{componentsPath}}/${pascal}.jsx`, template: 'component/component.hs' },
      { task: 'generate', target: `{{componentsPath}}/${pascal}.styles.js`, template: 'component/styles.hs' },
      { task: 'generate', target: `{{componentsPath}}/${pascal}.stories.jsx`, template: 'component/stories.hs' },
      { task: 'generate', target: `{{componentsPath}}/${pascal}.test.jsx`, template: 'component/component.test.hs' }
    ],

    tile: [
      { task: params => Object.assign(params, { dirUp: '../' }) },
      { task: 'generate', target: `${tiles}/index.js`, template: 'component/index.hs' },
      { task: 'generate', target: `${tiles}/${pascal}.jsx`, template: 'component/component.hs' },
      { task: 'generate', target: `${tiles}/${pascal}.styles.js`, template: 'component/styles.hs' },
      { task: 'generate', target: `${tiles}/${pascal}.stories.jsx`, template: 'component/stories.hs' },
      { task: 'generate', target: `${tiles}/${pascal}.test.jsx`, template: 'component/component.test.hs' }
    ],

    container: [
      { task: params => Object.assign(params, { dirUp: '' }) },
      { task: 'generate', target: `${containers}/index.js`, template: 'component/index.hs' },
      { task: 'generate', target: `${containers}/${pascal}.jsx`, template: 'component/container.hs' },
      { task: 'generate', target: `${containers}/${pascal}.styles.js`, template: 'component/styles.hs' },
      { task: 'generate', target: `${containers}/${pascal}.stories.jsx`, template: 'component/stories.hs' },
      { task: 'generate', target: `${containers}/${pascal}.test.jsx`, template: 'component/container.test.hs' }
    ],

    screen: [
      { task: 'generate', target: `${screens}/index.jsx`, template: 'screen/index.hs' },
      { task: 'generate', target: `${screens}/${pascal}.jsx`, template: 'screen/screen.hs' },
      { task: 'generate', target: `${screens}/${pascal}.skeleton.js`, template: 'screen/skeleton.hs' },
      { task: 'generate', target: `${screens}/${pascal}.styles.js`, template: 'screen/styles.hs' },
      {
        task: 'modify',
        target: `{{rootComponentPath}}`,
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
        dynamicTask: params => ({
          task: 'modify',
          target: `${redux}/${pascal}.actions.js`,
          patch: [
            {
              pattern: /\s$/,
              custom: (match) => {
                const args = params.arguments || (params.args ? params.args.split('|') : undefined);

                if (args) {
                  const arguments = args.join(', ');
                  const signature = args.length > 1 ? `(${arguments})` : arguments;

                  return match + `\nexport const {{type}} = ${signature} => ({ type: types.{{typeUpper}}, ${arguments} });\n`;
                }

                return match + '\nexport const {{type}} = () => ({ type: types.{{typeUpper}} });\n'
              }
            }
          ]
        }),
      }
    ],

    reducer: {
      dynamicTask: params => ({
        task  : 'modify',
        target: `${redux}/${pascal}.reducers.js`,
        patch : [
          {
            pattern: /\s$/,
            custom : (match) => {
              if (params.api && /FAILURE$/.test(params.typeUpper)) {
                return match + '\nexport const {{type}} = (state, { payload }) => state.update(\'{{originalType}}\', {{originalType}} => {\n' +
                  '  return {{originalType}}.merge({ loading: false, error: payload });\n' +
                  '});\n';
              }

              if (params.api && /SUCCESS/.test(params.typeUpper)) {
                return match + '\nexport const {{type}} = (state, { payload }) => state.update(\'{{originalType}}\', {{originalType}} => {\n' +
                  '  return {{originalType}}.merge({ loading: false, data: payload });\n' +
                  '});\n';
              }

              if (params.api) {
                return match + '\nexport const {{type}} = state => state.update(\'{{originalType}}\', {{originalType}} => {\n' +
                  '  return {{originalType}}.merge({ loading: true });\n' +
                  '});\n';
              }

              return match + '\nexport const {{type}} = state => state;\n';
            }
          }
        ]
      }),
    },

    sagas: [
      { task: 'generate', target: `sagas/${pascal}/${pascal}.sagas.js`, template: 'sagas/sagas.hs' },
      { task: 'generate', target: `sagas/${pascal}/index.js`, template: 'sagas/index.hs' },
      {
        dynamicTask: params => ({
          task: 'modify',
          target: 'sagas/index.js',
          patch: [
            {
              pattern: /^import (\w+) from '.\/\w+';\s/gm,
              custom: function (match, group1) {
                if (group1 > `${params.name}Sagas` && !params.updatedSagasImport) {
                  params.updatedSagasImport = true;

                  return `import {{name}}Sagas from './{{pascalCased}}';\n${match}`
                }

                return match;
              }
            }, {
              pattern: /^( +)(\w+Sagas)\(\),\n/gm,
              custom: function (match, group1, group2) {
                if (group2 > `${params.name}Sagas` && !params.updatedSagasCall) {
                  params.updatedSagasCall = true;

                  return `${group1}${params.name}Sagas(),\n${match}`
                }

                return match;
              }
            }, {
              pattern: /\nexport/,
              custom: match => params.updatedSagasImport ? match : `import {{name}}Sagas from './${pascal}';\n${match}`
            }, {
              pattern: /( +)]\);/g,
              custom: (match, spaces) => params.updatedSagasCall ? match : `${spaces}  {{name}}Sagas(),\n${match}`
            }]
        })
      }
    ],

    saga: [
      { definedTask: 'vd:typeUpper' },
      {
        task: 'modify',
        target: `sagas/${pascal}/index.js`,
        patch: [
          {
            pattern: /\s*]\);/,
            prepend: `\n    takeLatest(${pascal}Types.{{typeUpper}}, ${pascal}Sagas.{{type}}),`
          }
        ]
      },
      {
        task: 'modify',
        target: `sagas/${pascal}/${pascal}.sagas.js`,
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
      { definedTask: 'vd:fullAction', prepare: params => {
          params.api = true;
          params.originalType = params.type;
      }, sync: true },
      {
        definedTask: 'vd:action', prepare: params => {
          params.api = true;
          params.originalType = params.type;
          params.type += 'Success';
          params.arguments = ['payload'];
        }, sync: true
      },
      {
        definedTask: 'vd:action', prepare: params => {
          params.api = true;
          params.originalType = params.type;
          params.type += 'Failure';
          params.arguments = ['payload'];
        }, sync: true
      },
    ],

    // Utility tasks
    typeUpper: {
      task: parameters => Object.assign(parameters, {
        typeUpper: parameters.type.replace(/([A-Z])/g, c => `_${c}`).toUpperCase()
      })
    },
  }
};
