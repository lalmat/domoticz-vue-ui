module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript/recommended",
  ],
  rules: {
    "@typescript-eslint/ban-tslint-comment": "warn",

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
