var path = require("path");
var basePath = __dirname;

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  entry: ["@babel/polyfill", "./index.tsx"],
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        options: {
          useBabel: true,
          babelCore: "@babel/core" // needed for Babel v7
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: "url-loader?limit=5000"
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },

  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html", //Name of file in ./dist/
      template: "index.html", //Name of template in ./src
      hash: true
    })
  ],

  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: "inline-source-map",

  devServer: {
    port: 8080
  }
};
