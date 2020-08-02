const Path = require('path')
const GasWebpackPlugin = require('gas-webpack-plugin')

module.exports = (env, argv) => {
    /**
     * @type {string}
     */
    const ENTRY_FILE = 'index.ts'

    /**
     * @type {string}
     */
    const BUNDLE_FILE = 'index.gs'

    /**
     * @type {boolena}
     */
    const IS_DEVELOPMENT = argv.mode === 'development'

    return {
        entry: {
            index: Path.resolve(__dirname, 'src', ENTRY_FILE),
        },
        output: {
            path: Path.resolve(__dirname, 'dist'),
            filename: BUNDLE_FILE
        },
        devtool: IS_DEVELOPMENT ? 'inline-source-map' : 'none',
        resolve: {
            extensions: [ '.js', '.ts' ],
            modules: [
                Path.resolve(__dirname, 'node_modules'),
            ],
            alias: {
                '@src': Path.resolve(__dirname, 'src'),
            }
        },
        module: {
            rules: RULES,
        },
        plugins: [
            new GasWebpackPlugin(),
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