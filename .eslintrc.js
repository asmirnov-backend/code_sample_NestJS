module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'sonarjs'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    complexity: [1, 12],
    eqeqeq: 2,
    'max-statements-per-line': [
      2,
      {
        max: 1,
      },
    ],
    'max-depth': [
      2,
      {
        max: 2,
      },
    ],
    'max-lines': [2, 200],
    'no-eval': 2,
    'no-return-assign': 2,
    'no-param-reassign': 2,
    'no-var': 2,
    'prefer-const': 2,
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'newline-before-return': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'import/order': [
      'error',
      {
        groups: [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@common/**',
            group: 'internal',
          },
          {
            pattern: '@apps/**',
            group: 'internal',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
