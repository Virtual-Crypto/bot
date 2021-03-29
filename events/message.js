module.exports = async (client, message) => {
    client.console.info('msg')
    let prefix = client.settings.prefix;

    if (message.content.startsWith(prefix)) {
        console.log('prefix')
        let args = message.content.slice(prefix.length).split(/ +/g);
        let command = args.shift().toLocaleLowerCase();

        let cmdInfo = client.commands.get(command);
        if (!cmdInfo) cmdInfo = client.aliases.get(command);
        console.log(cmdInfo)

        if (cmdInfo) {
            console.log('command')
            cmdInfo.run(client, message, args);
        }
    }
}