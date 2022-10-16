module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
    "@vue/eslint-config-typescript/recommended",
  ],
  rules: {
    "key-spacing": ["error", {
      "multiLine": {
          "beforeColon" : false,
          "afterColon"  : true

      },
      "align": {
          "beforeColon" : true,
          "afterColon"  : true,
          "on"          : "colon"
      }
    }]
  }
}
