import webpack from 'webpack'
import config from './webpack'

/**
 * @descr 
 * @param {null}
 * @returns {Promise<void>} promise
 */
const bundle = () => {
    return new Promise((resolve, reject) => {
        webpack(config).run((err, stats) => {

            if (err) {
                return reject(err)
            }

            console.info(stats.toString(config.stats))

            if (stats.hasErrors()) {
                return reject(
                    new Error('Webpack compilation errors')
                )
            }

            return resolve()
        })
    })
}


export default bundle