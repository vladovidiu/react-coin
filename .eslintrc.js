module.exports = {
    env: {
        node: true,
        es6: true,
        browser: true,
        jest: true
    },
    extends: [
        "eslint:recommended",
        "google",
        "prettier",
        "plugin:react/recommended"
    ],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        experimentalObjectRestSpread: true
    },
    rules: {
        "comma-dangle": ["error", "always-multiline"],
        "no-console": "on",
        "no-invalid-this": "off",
        "no-var": "off",
        "require-jsdoc": "off"
    }
};
