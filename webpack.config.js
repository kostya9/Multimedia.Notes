module.exports={
  entry:'./renderer.js',
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
          presets:['react','es2015']
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
