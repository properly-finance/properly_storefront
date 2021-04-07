import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import wpConfig, { mwConfig as wpMwConfig} from '../webpack'
// import proxyMiddleware from 'http-proxy-middleware'
const history = require('connect-history-api-fallback');

const bundler = webpack(wpConfig)
const webpackMw = webpackDevMiddleware(bundler, wpMwConfig)

// PROXY
// 
// const proxyGlob = ['**']
// const proxyConfig = {target: 'http://backend:8000'}
// const proxyMw = proxyMiddleware(proxyGlob, proxyConfig)

export default {
    port: 3000,
    host: '0.0.0.0',
    open: false,
    watch: true,
    server: {
        middleware: [
            history({}),        
            webpackMw,
            // proxyMw,
        ]
    }
}