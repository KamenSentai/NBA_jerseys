module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.md$/,
          use: 'raw-loader',
        },
      ],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/tools/_index.scss";
        `,
      },
    },
  },
}
