const path = require("path"); // встроенная команда для задания пути
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"), // indicate path where all scource file are "src" and remove src frome file path (entry and template)
  mode: "development",
  entry: {
    main: "./index.ts",
  },

  output: {
    filename: "[name].bundle.js", // output file with all js files after bundling
    path: path.resolve(__dirname, "dist"), // where to put all files after bundling
  },
  devServer: {
    port: 4200,
    open: "chrome",
  }, // runs server without reloading th page
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html", // add html to "dist/index.html "
    }), // connecting all src files to HTML page with a fresh files
    new CleanWebpackPlugin(), // cleans all cash from residual files
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }), //creates a CSS file per JS file which contains CSS.
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // webpack now can read css files and add them to the project
      },

      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // webpack now can read scss files and add them to the project
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource", // file-loader deprecated
      },

      {
        test: /\.(ts)x?$/,
        exclude: /node_modules|\.d\.ts$/,

        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
