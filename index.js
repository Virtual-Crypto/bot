const { Client, Collection } = require('discord.js');
const client = new Client();
const settings = require('./settings.json')
const fs = require('fs')
client.login(settings.token);
client.commands = new Collection();
client.aliases = new Collection();
client.console = require('./console')
client.settings = settings;

fs.readdir('./events', (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        let name = file.split('.')
        if (name[1] !== 'js') return;
        const event = require(`./events/${file}`)
        client.on(name[0], event.bind(null, client));
    });
});

client.categories = fs.readdirSync('./commands');
fs.readdirSync('./commands/').forEach(category => {
    console.log(category);
    let commands = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));

    for (let file of commands) {
        console.log(file)
        console.log(file.split('.')[0])
        let command = require(`./commands/${category}/${file}`);
        command.category = category

        client.commands.set(file.split('.')[0], command);
        if (command.aliases && command.aliases.length > 0) command.aliases.forEach(alias => client.aliases.set(alias, command));
        console.log(client.commands)
        console.log(client.aliases)
    }
})
