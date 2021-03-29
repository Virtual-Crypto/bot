const colors = require('colors/safe')

module.exports = {
    info: (message) => {
        console.log(colors.green(`[INFO] - ${message}`))
    },
    error: (message) => {
        console.log(colors.red(`[ERROR] - ${message}`))
    }
}