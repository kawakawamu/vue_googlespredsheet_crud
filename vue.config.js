const isProd = process.env.NODE_ENV === "production";

module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: isProd ? "/vue_googlespredsheet_crud" : "/",
  outputDir: "docs",
  filenameHashing: false,
  productionSourceMap: false,
};
