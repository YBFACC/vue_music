module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    quotes: [0, 'single'],
    semi: [0, 'never'],
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        jsxBracketSameLinte: true
      }
    ]
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: ['plugin:vue/strongly-recommended', '@vue/prettier']
}
