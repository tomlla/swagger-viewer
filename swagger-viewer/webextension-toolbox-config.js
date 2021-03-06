const { resolve } = require("path")
const GlobEntriesPlugin = require("webpack-watched-glob-entries-plugin")
const babelOptions = require("./babel.config")

module.exports = {
  webpack: (config) => {
    // for Debug (JSON.stringifyでは一部の型のtoStringがnullになってしまうため、console.log(confg)も併用した方がよい)
    // console.log(JSON.stringify(config))

    // for TypeScript build
    config.resolve.extensions = [
      ...config.resolve.extensions,
      ...[".ts", ".tsx"],
    ]

    config.entry = GlobEntriesPlugin.getEntries([
      resolve("app", "*.{js,mjs,jsx,ts,tsx}"),
      resolve("app", "?(scripts)/*.{js,mjs,jsx,ts,tsx}"),
    ])

    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: "babel-loader",
          options: babelOptions,
        },
      ],
    })

    config.module.rules.push({
      test: /\.css/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: { url: false },
        },
      ],
    })

    return config
  },
}
