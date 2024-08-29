module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'array-callback-return': 0,
    'max-nested-callbacks': ['error', 5],
    'no-implicit-coercion': 'off',
    'consistent-return': 'off',
    'no-throw-literal': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }], // 允许for循环的 i++
    'no-param-reassign': 'off',
    'no-bitwise': 'off',
    'no-throw-literal': 'off',
    'no-use-before-define': 'off',
    'no-redeclare': 'off',
    'no-duplicate-imports': 2,
    'no-unused-expressions': 'off',
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-shadow': 'off',
  },
};
