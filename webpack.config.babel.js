import extractText from "extract-text-webpack-plugin"
import htmlPlugin from "html-webpack-plugin"
import webpack from 'webpack'
import path from "path"


/***plugins instances***/

 const html = new htmlPlugin({
  template: path.join(__dirname, 'app/index.html')
})

 const extractCss = new extractText({
   filename: "main.css"
  })

  const hotPlugin = new webpack.HotModuleReplacementPlugin()


module.exports = {
  entry: "./app/scripts/index.js",

  output: {
    filename: "app.js",
    path: path.join(__dirname , 'dist')
  },

  module: {
    rules: [
      {test: /\.js$/, exclude: /node-modules/, use: "babel-loader"},
      {test: /\.sass$/ , use: extractCss.extract({
        use: ["css-loader", "sass-loader"]
      })}
    ]
  },

  plugins: [html, extractCss],

  devServer: {
    port: 9093,
    open: true,
    stats: 'errors-only'
  }
}
