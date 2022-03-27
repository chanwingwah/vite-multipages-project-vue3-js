module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/prettier',
  ],
  rules: {
    'vue/require-default-prop': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
}
