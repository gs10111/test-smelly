import jest from 'eslint-plugin-jest';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...jest.environments.globals.globals,
      },
    },
    plugins: { jest },
    rules: {
      ...jest.configs['recommended'].rules,
      'jest/no-disabled-tests': 'warn',
      'jest/no-conditional-expect': 'error',
      'jest/no-identical-title': 'error',
    },
  },
];
