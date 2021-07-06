const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const AutoDllPlugin = require("autodll-webpack-plugin");

const cdn = {
  dev: {
    css: [],
    js: []
  },
  build: {
    css: [],
    js: [
      "https://cdn.bootcss.com/vue/2.6.11/vue.min.js",
      "https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js",
      "https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js",
      "https://cdn.bootcss.com/axios/0.19.2/axios.min.js"
    ]
  }
};

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  assetsDir: "h5",
  configureWebpack: config => {
    Object.assign(config.resolve.alias, {
      "@": resolve("src"),
      "@css": resolve("src/assets/css"),
      "@images": resolve("src/assets/images"),
      "@views": resolve("src/views"),
      "@pages": resolve("src/pages")
    });

    if (process.env.NODE_ENV !== "production") {
      config.plugins.push(
        new HardSourceWebpackPlugin(),
        new AutoDllPlugin({
          inject: true,
          debug: true,
          filename: "[name]_[hash].js",
          path: "./dll" + Date.parse(new Date()),
          entry: {
            vendor_vue: ["vue", "vuex", "vue-router"],
            vendor_ui: ["vue-awesome-swiper", "vue-ydui"],
            vendor_tools: ["axios", "core-js"]
          }
        })
      );
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].VUE_APP_NAME = process.env.VUE_APP_NAME;
      return args;
    });
  },
  css: {
    // 提取css代码到文件
    // extract: true
    // css预设器配置项
    loaderOptions: {
      scss: {
        //引入全局样式
        // data：`@import "~@/assets/variable.scss";` v7之前使用 的是data，现在改成了prependData
        prependData: `@import "~@/assets/styles/global.scss";`
      }
    }
  }
};

/*module.exports = {
  //打包路径
  publicPath: './',

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,


  chainWebpack: config => {

    //文件路径名替换
    config.resolve.alias
      .set('@', path.resolve(__dirname, './src'))
      .set('cps', path.resolve(__dirname, './src/components'))
  },

  configureWebpack: config => {
  }

}*/
