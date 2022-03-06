module.exports = {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-styled-components",
    "stylelint-config-prettier",
  ],
  overrides: [
    {
      customSyntax: "@stylelint/postcss-css-in-js",
      files: ["**/*.{js,ts,jsx,tsx}"],
    },
  ],
  plugins: ["stylelint-order"],
  rules: {
    "function-no-unknown": null,
    "order/properties-alphabetical-order": true,
  },
};
