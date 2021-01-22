const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.ts",
  mode: isProd ? "production" : "development",
  devtool: 'inline-source-map',
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 1207
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: "awesome-typescript-loader" }],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html")
    }),
    // Pixi will manage game asset loading, so we just need to copy them.
    // Webpack will not be involved in bundling.
    new CopyPlugin([{ from: "src/assets", to: "assets" }, { from: "src/test", to: "test" }])
  ]
};
