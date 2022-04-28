const path = require('path')

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                include: /(lottie)/,
                loader: 'lottie-web-webpack-loader',
                options: {
                    assets: {
                        scale: 0.5 // proportional resizing multiplier
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                                modifyVars: { '@enable-css-reset': false }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(pdf|jpg|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader"
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', '.json']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        }
    }
};