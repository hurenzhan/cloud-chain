module.exports = {
    devServer: {
        host: 'localhost',
        port: 3000,
        proxy: {
            '/ctag': {
                target: 'http://8.136.148.160',
                // target: 'https://dog.ceo',
                // ws: true,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/ctag': '/ctag'
                },
            }
        },
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
}