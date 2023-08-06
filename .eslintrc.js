module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "airbnb-base/legacy"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 6,
    requireConfigFile: false,
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double"],
    comma-dangle: ["error", "never"],
    no-underscore-dangle: ["error"],
  },
};
