import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import { fixupConfigRules } from '@eslint/compat';


const options = [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      ecmaFeatures: { jsx: true },
    },
  } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    'rules': {
      'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
      'quotes': [ 'error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true } ],
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'semi': 'error',
      'max-len': 'off',
      'no-extra-semi': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-trailing-spaces': [ 'error', { 'skipBlankLines': true, 'ignoreComments': false } ],
      'no-multiple-empty-lines': [ 'error', { 'max': 2, 'maxEOF': 1 } ],
      'brace-style': [ 'error', '1tbs', { 'allowSingleLine': true } ],
      'comma-spacing': [ 'error', { 'before': false, 'after': true } ],
      'object-curly-spacing': [ 'error', 'always' ],
      'no-extra-parens': 'warn',
      'array-bracket-spacing': [ 'error', 'always', { 'singleValue': false } ],
      'no-irregular-whitespace': 'error',
      'no-multi-spaces': 'off',
      'no-new-object': 'warn',
      'no-useless-escape': 'error',
      'arrow-spacing': [ 'warn', { 'before': true, 'after': true } ],
      'no-var': 'error',
      'prefer-const': 'warn',
      'prefer-template': 'warn',
      'no-useless-constructor': 'error',
      'no-empty-function': 'error',
      'prefer-arrow-callback': 'warn',
      'arrow-parens': [ 'warn', 'always' ],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'comma-dangle': [ 'error', 'always-multiline' ],
      'space-before-function-paren': [ 'error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' } ],
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    },
    'settings': {
      'react': {
        'version': 'detect',
      },
    },
  },
];


export default options;
