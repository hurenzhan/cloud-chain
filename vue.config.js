module.exports = {
    devServer: {
        host: 'localhost',
        port: 3000,
        proxy: {
            '/api': {
                target: 'https://dog.ceo',
                ws: true,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': '/api'
                },
            }
        },
    }
}