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
    'comma-dangle': ['error', 'always-multiline'], // Require trailing commas in multiline
    'quotes': ['error', 'single'], // Use single quotes
    'no-trailing-spaces': 'error', // No trailing spaces
    'eol-last': 'error', // Require newline at end of file
    'consistent-return': 'error', // Consistent return statements
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // No unused variables, except those starting with _
  },
};
