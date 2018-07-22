var path = require('path');

module.exports = {
    entry : './src/js/index.js',

    mode : 'development',

    output : {
        path : path.resolve(__dirname, 'out'),
        filename : 'main.js'
    },

    module : {
        rules : [
            {
                test : /\.less$/,
                use : ['style-loader', 'css-loader', 'less-loader'],
                include : path.resolve(__dirname, 'src'),
            },
            {
                test : /.(jpg|png|gif|svg)$/,
                use : ['url-loader?limit=8000&name=/[name].[ext]']
            }
        ]
    },

    devServer : {
        open : true,
        inline : true,
        port: 8001,
        host: '127.0.0.1',
        hot : true,
        noInfo : false,
        historyApiFallback : true,
        proxy : {
            '/getPics.php' : {
                target : 'http://localhost:80/getPics.php',
                secure : false
            }
        }
    }
}