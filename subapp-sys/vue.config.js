const path = require('path');
const { name,port } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir);
}
const dev = process.env.NODE_ENV === 'developent'
module.exports = {
    publicPath: '/',
    outputDir: 'sys',
    assetsDir: 'static',
    filenameHashing: true, 
    devServer: {
        hot: true,
        disableHostCheck: true,
        port,
        overlay: {
            warnings: false,
            errors: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        //防止单体项目刷新后404
        historyApiFallback:true,
    },
    // 自定义webpack配置
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
        output: {
            // 把子应用打包成 umd 库格式
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`,
        },
        externals: {
            'element-ui':'ELEMENT',
            'vue':'Vue',
            'vue-router':'VueRouter',
            'vuex': 'Vuex',
            'axios':'axios'
        }
    },
};


