const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  env: {
    API_URL:'https://tracebackaigptv4-4t2r2e6xka-uc.a.run.app/api/new-gpt',
    RECC_API_URL:'https://tracebackaigpt-reccomendationsv3-4t2r2e6xka-uc.a.run.app/api/new-gpt',
    CODE_SUMM_URL:'https://tracebackaigptcodesummary-4t2r2e6xka-uc.a.run.app',
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
