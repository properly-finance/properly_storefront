import { DefinePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { 
    ROOT_DIR, BUILD_DIR, SRC_DIR, PUBLIC_DIR,
    DEBUG, QUIET, resolvePath } from '../consts'
import scriptsRules from './rules/scripts'
import stylesRules from './rules/styles'
import imagesRules from './rules/images'
import fontsRules from './rules/fonts'
import getClientEnvironment from '../env'


const env = getClientEnvironment()

// COMMON
//
const config = {
    context: ROOT_DIR,
    mode: DEBUG
        ? 'development'
        : 'production',
    bail: !DEBUG,
    cache: DEBUG,
    devtool: DEBUG
        ? 'cheap-module-inline-source-map'
        : 'source-map',
    target: 'web',
    stats: {
        cached: !QUIET,
        cachedAssets: !QUIET,
        chunks: !QUIET,
        chunkModules: !QUIET,
        colors: true,
        hash: !QUIET,
        modules: !QUIET,
        reasons: DEBUG,
        timings: true,
        version: !QUIET,
    }
}

// OPTIMIZATION
// 
config['optimization'] = {
    noEmitOnErrors: true,
    minimize: !DEBUG,
    splitChunks: {
        cacheGroups: {
            vendors: {
                name: 'vendors',
                test: /[\\/]node_modules[\\/]/,
                chunks: 'all',
                priority: -10,
            },
            default: {
                minChunks: 3,
                priority: -20,
                reuseExistingChunk: true,
            }
        }
    }
}

// ENTRY
// 
config['entry'] = {
    app: ['./src/index.tsx'],
    vendor: ['react', 'react-dom'],
}

// OUTPUT
//
config['output'] = {
    path: BUILD_DIR,
    // publicPath: '/build/',
    publicPath: '/',
    filename: DEBUG 
        ? '[name].js' 
        : '[name].[chunkhash:8].js',
    chunkFilename: DEBUG
        ? '[name].chunk.js'
        : '[name].[chunkhash:8].chunk.js',
}

// RESOLVE
//
config['resolve'] = {
    modules: ['node_modules', 'src'],
    extensions: ['.ts', '.tsx', '.json', '.js'],
    alias: {
      '@assets': resolvePath(ROOT_DIR, 'assets'),
      '@locale': resolvePath(ROOT_DIR, 'locale'),
      '@emmpair': SRC_DIR,
    }
}


// MODULE
//
config['module'] = {
    // .. Make missing exports an error instead of warning
    strictExportPresence: true,
    rules: [
        scriptsRules,
        stylesRules,
        imagesRules,
        fontsRules,
    ],
}

// PLUGGINS
//
config['plugins'] = [
    new MiniCssExtractPlugin({
        filename: DEBUG 
            ? '[name].css' 
            : '[name].[contenthash:8].css',
        chunkFilename: DEBUG 
            ? '[name].chunk.css' 
            : '[name].[contenthash:8].chunk.css',
    }),
    new DefinePlugin({
        __DEV__: DEBUG,
        ...env.stringified
    }),
    new HtmlWebpackPlugin({ 
        filename: resolvePath(BUILD_DIR, 'index.html'),
        template: resolvePath(PUBLIC_DIR, 'index.ejs'),
    }),
    // new HotModuleReplacementPlugin()
]

// MIDDLEWARE
//
export const mwConfig = {
    publicPath: config.output.publicPath,
    noInfo: true,
    quiet: QUIET,
    stats: {
        colors: true,
        assets: false,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    }
}

export default config
