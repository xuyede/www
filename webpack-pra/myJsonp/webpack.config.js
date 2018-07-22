var path = require('path');

module.exports = {
    entry : './src/js/index.js',
    
    mode : 'development',

    output : {
        path : path.resolve(__dirname, 'out'),
        filename : 'main.js'
    },

    devServer : {
        inline : true,
        hot : true,
        noInfo : false,
        port : 8001,
        host : '127.0.0.1',
        open : true,
        proxy : {
            'http://127.0.0.1:8001/src/js/getData.php' : {
                target : 'http://localhost:80/getData.php',
                secure : false
            }
        }
    }
};