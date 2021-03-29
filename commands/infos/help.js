const { MessageEmbed } = require('discord.js')
const fs = require('fs')

module.exports = {
    aliases: ['h'],
    run: (client, msg, args) => {
        console.log(` --------------------- HELP`)
        if (!args[0]) {
            let embed = new MessageEmbed()
                .setColor(client.colors.lightblue);

            client.categories.forEach(category => {
                const up = category.slice(0, 1).toUpperCase()+category.slice(1);
                let txt = '';
                let commands;
                commands = fs.readdirSync(`./commands/${category}`)
                    .filter(file => file.endsWith('.js'));

                for (let i in commands) {
                    txt += ` \`${commands[i].split('.')[0]}\` ─`
                }
                txt = txt.substring(0, txt.length-2);
                embed.addField(
                    `${category.toLocaleLowerCase() === 'entreprise' ? 
                        client.emojis.company :
                        ':question:'} > ${up} (${commands.length})`,
                        txt
                );
            })

            msg.channel.send(embed);
        } else {
            let command = client.commands.get(args[0]);
            if (!command) command = client.aliases.get(args[0]);

            if (!command) return msg.channel.send(
                new MessageEmbed()
                    .setColor(client.colors.red)
                    .setDescription(`:x: | Je n'ai trouvé aucune commande \`${args[0]}\`, pour voir la liste des commandes faites \`${client.settings.prefix}help\``)
                    .setFooter(msg.author.username, msg.author.avatarURL({}))
                    .setTimestamp()
            );

            msg.channel.send(
                new MessageEmbed()
                    .setColor(client.colors.lightblue)
                    .setTitle(`Commande \`${client.settings.prefix+args[0]}\``)
                    .setDescription(`**Description** :\n${command.description || 'Aucune'}\n\n**Aliases** :\n${command.aliases.join(' - ') || 'Aucun'}`)
            )
        }
    }
}
/*
─
-
 */