var path = require('path');

module.exports = {
    entry: './src/CookieNotice.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'CookieNotice.js',
        libraryTarget: 'var',
        libraryExport: 'default',
        library: 'CookieNotice',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
