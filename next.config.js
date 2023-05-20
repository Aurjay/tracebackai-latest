const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  env: {
    API_URL:'http://192.168.0.101:8080/api/new-gpt',
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
