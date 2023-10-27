const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const templatePath = (pageName) => {
  return `./src/pages/${pageName}/index.html`;
};

const scriptPath = (pageName) => {
  return `./src/pages/${pageName}/scripts/index.ts`;
};

module.exports = {
  mode: "none",
  entry: {
    "gradient-descent": scriptPath("gradient-descent"),
  },
  output: {
    globalObject: "self",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: "index.html",
      template: templatePath("index"),
      title: "Machine Learning Simulations",
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: "gradient-descent.html",
      template: templatePath("gradient-descent"),
      title: "Gradient Descent",
      chunks: ["gradient-descent"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/public", to: "assets", noErrorOnMissing: true },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[name].css",
    }),
  ],
  devtool: "eval-source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    hot: true,
  },
  resolve: {
    extensions: ["*", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.ts$/,
        exclude: /node_module/,
        use: "ts-loader",
      },
    ],
  },
};
