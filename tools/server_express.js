import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import wpConfig, { mwConfig as wpmwConfig} from './webpack'

const port = process.env.PORT || 3000
const bundler = webpack(wpConfig)
const wpdevMiddleware = webpackDevMiddleware(bundler, wpmwConfig)

export default async () => {
  const server = express()
  server.use(wpdevMiddleware)
  server.listen(port, () => { 
    console.log(`run devserver on port ${port}`) 
    console.log('Press Ctrl+C to quit.')
  })
  return server
}
