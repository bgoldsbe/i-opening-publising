const path = require("path");

// const cssModuleConfig = {
//   attributeNames: {activeStyleName: "activeClassName"},
//   exclude: "css/",
//   filetypes: {
//     ".scss": {
//       syntax: "postcss-scss",
//       plugins: ["postcss-nested"]
//     }
//   },
//   generateScopedName: "[name]__[local]___[hash:base64:8]",
//   handleMissingStyleName: "warn" // dynamic classnames in PaymentInstrumentIcon
// };

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          modules: "commonjs"
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      "add-module-exports",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-optional-chaining"
      // [
      //   "module-resolver",
      //   {
      //     alias: {css: path.join(__dirname, "./src/css")}
      //   }
      // ],
      // ["react-css-modules", cssModuleConfig]
    ]
    // env: {
    //   test: {
    //     plugins: [
    //       "@babel/plugin-transform-runtime",
    //       [
    //         "react-css-modules",
    //         {
    //           ...cssModuleConfig,
    //           generateScopedName: "[local]"
    //         }
    //       ]
    //     ]
    //   }
    // }
  };
};
