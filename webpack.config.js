const path = require("path");

const postCSSPlugins = [
    require("postcss-mixins"),
    require("postcss-import"),
    require("postcss-simple-vars"),
    require("postcss-nested"),
    require("autoprefixer"),
    require("postcss-hexrgba")
    ];
module.exports = {
    entry: "./app/assets/scripts/App.js",
    output: {
        filename: "bundled.js",
        path: path.resolve(__dirname, "app")
    },
    // Web browseriig full reload hiilgui haruulah
    devServer: {
        watchFiles: ("./app/*.html"),
        static: {
            directory: path.join(__dirname, 'app')
        },
        // inject hiij refresh hiihgui bolgono
        hot: true,
        host: '0.0.0.0',
        port: 3000
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                // bundle hiisen file-uudig webd uzuuleh, css file-udiig bundle hiih
                use: ["style-loader", "css-loader", {loader: 'postcss-loader',
                options: {postcssOptions: {plugins: postCSSPlugins}}}],
            }
        ]
    }
}