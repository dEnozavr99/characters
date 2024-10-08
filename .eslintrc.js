module.exports = {
  root: true,
  extends: ["@react-native", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      1,
      {
        arrowParens: "always",
        bracketSameLine: false,
        bracketSpacing: true,
        singleQuote: false,
        trailingComma: "all",
      },
    ],
  },
};
