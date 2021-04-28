module.exports = {
  plugins: ["cypress"],
  env: {
    mocha: true,
    "cypress/globals": true
  },
  rules: {
    strict: "off"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
