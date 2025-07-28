// module.exports = {
//   env: {
//     browser: true,
//     commonjs: true,
//     es2021: true
//   },
//   extends: 'standard',
//   overrides: [
//     {
//       env: {
//         node: true
//       },
//       files: [
//         '.eslintrc.{js,cjs}'
//       ],
//       parserOptions: {
//         sourceType: 'script'
//       }
//     }
//   ],
//   parserOptions: {
//     ecmaVersion: 'latest'
//   },
//   rules: {
//   }
// }
module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    eqeqeq:'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'never'
    ]
  }
}
