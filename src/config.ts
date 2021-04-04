import packageInfo from "../package.json"

export const DEBUG = process.env.NODE_ENV !== 'production'
export const APP_MOUNT_URI = process.env.APP_MOUNT_URI
export const APP_VERSION = packageInfo.version

export const APP_DEPOSIT_CONTRACT_ADDRESS = process.env.APP_DEPOSIT_CONTRACT_ADDRESS
export const APP_TOKEN_CONTRACT_ADDRESS = process.env.APP_TOKEN_CONTRACT_ADDRESS