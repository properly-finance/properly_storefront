import { timeformat } from './utils'

const run = async (fn, options) => {

    const task = typeof fn.default === 'undefined' 
        ? fn 
        : fn.default

    const optsstr = options 
        ? options 
        : ''

    const start = new Date()
    console.info(``
        + `[${timeformat(start)}] `
        + `Starting '${task.name} ${optsstr}'...`
    )

    const resolution =  await task(options)

    const end = new Date()
    const time = end.getTime() - start.getTime()
    console.info(``
        + `[${timeformat(end)}] `
        + `Finished '${task.name} ${optsstr}' after ${time} ms`
    )
}


if (require.main === module && process.argv.length > 2) {

    // eslint-disable-next-line no-underscore-dangle
    delete require.cache[__filename]
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const module = require(`./${process.argv[2]}.js`)

    run(module.default).catch(err => {
        process.exit(1)
    })
}

export default run