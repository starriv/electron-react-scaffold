module.exports = {
    plugins: [
        "react"
    ],
    extends: [
        "plugin:react/recommended",
        "prettier",
        "prettier/react",
    ],
    parserOptions: {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    env: {
        "es6": true,
        "node": true
    },
    rules: {
        "prettier/prettier": "error"
    }
}