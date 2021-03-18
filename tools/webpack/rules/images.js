import { DEBUG } from '../../consts'


const staticAssetName = DEBUG
    ? '[path][name].[ext]'
    : '[hash:8].[ext]'

export default {
    test: /\.(bmp|gif|jpe?g|png|svg|ico)$/,
    rules: [{
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
            name: staticAssetName,
            limit: 4096, // 4kb
        },           
    },{
        test: /favicon\.ico$/,    
        loader: 'file-loader',
        options: {
            name: '[name].[ext]'
            // name: '[hash:8].[ext]'            
            // limit: 4096, // 4kb
        }, 
    },{
        test: /\.(jpg|png)$/,
        // include: /\/src\/resources\//,
        loader: 'file-loader',
        options: {
            name: '[1]',
            regExp: /src\/(.+)/,
            // name (fullname){
            //     return /src\/(.+)/.exec(fullname)[1]
            // }
        }, 
    }] 
}

