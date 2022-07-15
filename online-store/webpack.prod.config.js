const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
    ],
    optimization: {
        minimize: true,
    },
};
