import { SRC_DIR } from '../../consts'


export default {
    test: /\.(ts|tsx)$/,
    include: SRC_DIR,
    loader: 'ts-loader',
}
