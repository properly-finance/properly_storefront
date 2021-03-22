import { ROOT_DIR, resolvePath } from './consts'

require('dotenv-expand')(
  require('dotenv').config({
    path: resolvePath(ROOT_DIR, '.env'),
  })
)

const REACT_APP = /^APP_/i;

function getClientEnvironment() {

  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    },{
      NODE_ENV: process.env.NODE_ENV || 'development',
      BROWSER: true,
    })

  const stringified = {
    'process.env': Object.keys(raw)
      .reduce((env, key) => {
        env[key] = JSON.stringify(raw[key]);
        return env;
      }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;