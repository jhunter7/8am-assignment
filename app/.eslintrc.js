module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // Add any custom rules here
    'no-console': 'off', // Allow console.log in Node.js apps
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
