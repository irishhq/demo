// 导入插件
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var path = require('path')
var config = {
    entry: {    /* 入口 */
        main: './main'
    },
    output: {   /* 出口 */
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',  /* 资源文件引用的目录 */
        filename: 'main.js' /* 输出文件的名称 */
    },
    module: {   /* 加载器 */
        // rules: [    /* module属性中rules可以指定一系列的loaders,每一个loader都必须包含tes和use两个选项 */
        //     {
        //         test: /\.css$/,
        //         use: [
        //             'style-loader',
        //             'css-loader'
        //         ]   /* 如果use是数组则编译顺序：从下至上,use还可以是字符串 */
        //     }   /* 当webpack编译遇到require()或import语句导入包含一个后缀名为.css的文件时，按顺序通过上述两个转换，然后继续打包。 */
        // ]
        // rules: [    /* module属性中rules可以指定一系列的loaders,每一个loader都必须包含tes和use两个选项 */
        //     {
        //         test: /\.css$/,
        //         use: ExtractTextPlugin.extract({
        //             use: 'css-loader',
        //             fallback: 'style-loader'
        //         })
        //         /* 如果use是数组则编译顺序：从下至上,use还可以是字符串 */
        //     }   /* 当webpack编译遇到require()或import语句导入包含一个后缀名为.css的文件时，按顺序通过上述两个转换，然后继续打包。 */
        // ]
        rules: [
            // {
            //     test: /\.html$/,
            //     use: {
            //         loader: 'html-loader'
            //     }
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: [
                            'vue-style-loader',
                            'mini-css-extract-plugin',
                            'css-loader'
                        ]
                    }
                }
            },
			{
				test: /\.css$/,
				use:[ //数组形式的话，编译是从后往前。
					MiniCssExtractPlugin.loader,
        　　 　　 	'css-loader'
				]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    esModule: false, // 这里设置为false,默认情况下，文件加载器会生成使用ES模块语法的JS模块。
                    name: "[name].[ext]",
                    limit: 1024
                }
            }
        ],
    },
    plugins: [  /* 插件 */
        // 重命名提取后的css文件
        // new ExtractTextPlugin('main.css')
        new MiniCssExtractPlugin('main.css'),
        new VueLoaderPlugin()
    ]
}

module.exports = config