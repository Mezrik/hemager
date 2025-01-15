const path = require('path');

module.exports = {
  env: { node: true, es2020: true },
  extends: ['@hemager/eslint-config'],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.*'],
  parserOptions: { project: path.join(__dirname, 'tsconfig.json') },
  plugins: ['codegen'],
  rules: {
    'codegen/codegen': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/resolver': {
          typescript: {
            project: path.join(__dirname, 'tsconfig.json'),
          },
        },
      },
    },
  ],
};
