let cooldown = new Map();
let { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    aliases: ['report', 'bugs'],
    description: 'Permet de signaler un bug sur le fonctionnement du bot',
    run: async (client, msg) => {
        if (cooldown.get(msg.author.id) > Date.now()) {
            let diff = cooldown.get(msg.author.id) - Date.now();
            diff = ms(ms(diff.toString()));
            return msg.channel.send(
                new MessageEmbed()
                    .setColor(client.colors.red)
                    .setDescription(`:x: | Vous avez déja fait une suggestion récemmment ! Réessayez dans \`${diff}\`.`)
            );
        }

        let content = {
            report: msg.author
        }

        let menu = await msg.channel.send(
            new MessageEmbed()
                .setColor(client.colors.orange)
                .setDescription(':question: | Quel est le titre de votre bug ?')
        );

        let filter = (message) => {
            return message.author.id === msg.author.id
        };

        let step = 0

        const collector = msg.channel.createMessageCollector(filter, { time: 240000 });

        collector.on('collect', async (message) => {
            message.delete()
            step++

            switch (step) {
                case 1:
                    content.title = message.content;
                    menu.edit(
                        new MessageEmbed()
                            .setColor(client.colors.orange)
                            .setDescription(`:question: | Quelle est la description de votre bug ? Soyez le plus précis possible, et décrivez les circonstances dans les quelles ce bug est survenu, afin que nous puissions le reproduire et le corriger de la manière la plus optimale possible.`)
                    );
                    break;

                case 2:
                    content.description = message.content;
                    await report();
                    collector.stop()
                    break;
            }
        })

        async function report() {
            try {
                let channel = client.channels.cache.get(client.settings.bugsChannelID);

                if (!channel) return msg.channel.send(
                    new MessageEmbed()
                        .setColor(client.colors.red)
                        .setDescription(':x: | Il y a eut une erreur lors de l\'envoi du bug. Le salon de signalement n\'a pas été trouvé. Veuillez signaler ce bug a mes administrateurs.')
                );

                let reactionMenu = await channel.send(
                    new MessageEmbed()
                        .setColor(client.colors.orange)
                        .setTitle(`Signalement de bug par \`${msg.author.tag}\` (${msg.author.id}) : ${content.title}`)
                        .setDescription(content.description + `\n\nPour publuier ce bug sur GitHub, réagissez sous ce message avec l'emoji 📌`)
                );

                reactionMenu.react('📌');

                client.bugs.set(reactionMenu.id, content);

                msg.channel.send(
                    new MessageEmbed()
                        .setColor(client.colors.green)
                        .setDescription(`:white_check_mark: | Votre bug a bien été signalé. Si il est validé par les administrateurs, vous pourrez le retrouver dans les issue sur [notre github](https://github.com/Nininanou16/)`)
                )
            } catch (e) {
                if (e) {
                    if (e.length >= 2000) e.length = 1999
                    client.console.error(e);
                    msg.channel.send(
                        new MessageEmbed()
                            .setColor(client.colors.red)
                            .setTitle('Il y a eut une erreur lors de votre signalement de bug :')
                            .setDescription(e)
                    );
                }
            }
        }
    }
}