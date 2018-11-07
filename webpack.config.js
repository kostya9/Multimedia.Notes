module.exports={
  entry:'./renderer.js',
  target: 'electron-renderer',
  output:{
    filename:'./renderer-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query:{
          presets:['react','babel-preset-env']
        }
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=compressed'
      }
    ]
  },
  sassLoader: {
    includePaths: [
      './node_modules'
    ]
  }
}
