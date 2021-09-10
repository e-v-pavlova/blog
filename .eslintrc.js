module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
    'nuxt',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': ['error', { js: 'ignorePackages' }],
  },
};
