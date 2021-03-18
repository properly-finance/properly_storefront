import { DEBUG } from '../../consts'


const staticAssetName = DEBUG
    ? '[path][name].[ext]'
    : '[hash:8].[ext]'

export default {
    test: /\.(woff(2)?|[ot]tf|eot)$/,
    rules:[{
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader:'file-loader',
        options: {    
            name: staticAssetName,
        },
    },{
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: staticAssetName,
        },
    },{
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
            name: staticAssetName,
        }
    }]
}
