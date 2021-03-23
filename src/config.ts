import packageInfo from "../package.json";

export const DEBUG = process.env.NODE_ENV !== 'production';
export const APP_MOUNT_URI = process.env.APP_MOUNT_URI;
export const APP_VERSION = packageInfo.version;