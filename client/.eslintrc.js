module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["react-app", "react-app/jest"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": 2
    }
};
