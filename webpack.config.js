const path = require('path')
const createExpoWebPackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv){
    const config = await createExpoWebPackConfigAsync(env, argv)

    config.module.rules.push({
        text: /\.js$/,
        loader: 'babel-loader',
        include: [
            path.join(_dirname, 'node_modules/react-router-native')
        ]
    })

    return config
}