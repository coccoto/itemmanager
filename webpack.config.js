const path = require('path')
const gasWebpackPlugin = require('gas-webpack-plugin')

const ENTRY_FILE = 'index.ts'
const BUNDLE_FILE = 'index.gs'

const SOURCE = path.resolve(__dirname, 'src')
const OUTPUT = path.resolve(__dirname, 'dist')

module.exports = (env, argv) => {

    const IS_DEVELOPMENT = argv.mode === 'development'

    return {
        entry: {
            index: path.resolve(SOURCE, ENTRY_FILE),
        },
        output: {
            path: path.resolve(OUTPUT),
            filename: BUNDLE_FILE
        },
        devtool: IS_DEVELOPMENT ? 'inline-source-map' : 'none',
        resolve: {
            extensions: [ '.js', '.ts' ],
            modules: [
                path.resolve(__dirname, 'node_modules'),
            ],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        },
        module: {
            rules: RULES,
        },
        plugins: [
            new gasWebpackPlugin(),
        ],
    }
}

/**
 * @type {object}
 */
const RULES = [
    {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
    },
]