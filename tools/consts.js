import path from 'path'

// mode
export const DEBUG = !process.argv.includes('--release')
export const QUIET = process.argv.includes('--quiet')

// dirs
export const ROOT_DIR = path.resolve(__dirname, '..')

export const resolvePath = (...args) => (
    path.resolve(ROOT_DIR, ...args)
)

export const SRC_DIR = resolvePath('src')
export const BUILD_DIR = resolvePath('build')
export const PUBLIC_DIR = resolvePath('public')
