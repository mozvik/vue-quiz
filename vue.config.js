module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-quiz/'
    : '/',
    configureWebpack: {
      devtool: 'source-map'
    }
  }