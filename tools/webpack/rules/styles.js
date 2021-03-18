import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import PostCssFlexbugsFixes from 'postcss-flexbugs-fixes'
import PostCssPresetEnv from 'postcss-preset-env'
import PostCssNormalize from 'postcss-normalize'
import { DEBUG, SRC_DIR } from '../../consts'


export default {
    test: /\.(styl|(le|sa|sc|s|c)ss)$/,
    include: SRC_DIR,
    sideEffects: true,
    rules: [{
        loader: MiniCssExtractPlugin.loader
    },{
        loader: 'css-loader',
        options: {
            importLoaders: 3,
            sourceMap: DEBUG,
        },
    },{
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                PostCssFlexbugsFixes(),
                PostCssPresetEnv({
                    autoprefixer: {
                        flexbox: 'no-2009',
                        },
                    stage: 3,
                }),
                PostCssNormalize(),
            ],
            sourceMap: DEBUG,
        },
    },{
        loader: 'resolve-url-loader',
        options: {
            sourceMap: DEBUG,
            root: SRC_DIR,
        },
    },{
        test: /\.(scss|sass)$/,
        include: SRC_DIR,
        loader: 'sass-loader',
        options:{
            sourceMap: DEBUG,
        },
    }].filter(Boolean)
}