const { MessageEmbed } = require('discord.js');

module.exports = {
    aliases: ['bal'],
    description: 'Permet de consulter votre profil, contenant votre argent, vos entreprises, et vos investissements',
    run: async (client, msg) => {
        let embed = new MessageEmbed()
            .setColor(client.colors.lightblue)
            .setTitle(`Profil de **${msg.author.username}**`)
            .setDescription(`
                ${client.emoji.coins} **XXXXX** argent total
                ${client.emoji.wallet} **XXXX** en cash
                ${client.emoji.bank} **XXXX** en banque
                ${client.emoji.gold} **XXXX** lingots d'or
                ${client.emoji.btc} **XXXX** bitcoins`);

        let menu = await msg.channel.send(embed);

        let page = 0;

        let pages = [
            `${client.emoji.coins} **XXXXX** argent total
            ${client.emoji.wallet} **XXXX** en cash
            ${client.emoji.bank} **XXXX** en banque
            ${client.emoji.gold} **XXXX** lingots d'or
            ${client.emoji.btc} **XXXX** bitcoins`,
            `**Principales entreprises** :
            ${client.emoji.company} **Companie A** (${client.emoji.capital} Capital : **XXXX** ${client.emoji.coins})
            ${client.emoji.company} **Companie B** (${client.emoji.capital} Capital : **XXXX** ${client.emoji.coins})`,
            `**Principales actions** :
            ${client.emoji.action} **Companie C** (X -> **XXXX** ${client.emoji.coins})
            ${client.emoji.action} **Companie D** (X -> **XXXX** ${client.emoji.coins})`
        ]

        let emojis = [client.emoji.chest.id, client.emoji.company.id, client.emoji.action.id];
        for (let i in emojis) {
            let id = emojis[i];
            menu.react(id)
        }

        let filter = (reaction, user) => {
            return user.id === msg.author.id && emojis.includes(reaction.emoji.id)
        }
        const collector = await menu.createReactionCollector(filter, { timeout: 30000 })

        function update() {
            embed.setDescription(pages[page])
            menu.edit(embed);
        }

        collector.on('collect', async (reaction, user) => {
            console.log('reaction')
            reaction.users.remove(msg.author)
            switch (reaction.emoji) {
                case client.emoji.chest:
                    page = 0;
                    update()
                    break;

                case client.emoji.company:
                    page = 1;
                    update()
                    break;

                case client.emoji.action:
                    page = 2;
                    update()
                    break;
            }
        })
    }
}