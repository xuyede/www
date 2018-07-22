const path = require('path');

module.exports = {
    entry : './src/js/index.js',
    mode : 'development',
    output : {
        path : path.resolve(__dirname, 'out'),
        filename : 'main.js',
        publicPath : './out'
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : ['style-loader', 'css-loader?minimize'],
                include : path.resolve(__dirname, 'src')
            },
            {
                test : /\.(jpg|png|svg)$/,
                use : ['url-loader'],
                include : path.resolve(__dirname, 'src')
            }

        ]
    }
};