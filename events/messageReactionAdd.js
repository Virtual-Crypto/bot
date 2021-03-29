const issue = require('github-create-issue')
const { MessageEmbed } = require('discord.js')

module.exports = async (client, reaction, user) => {
    if (user.bot) return;
    let message = reaction.message;
    let bug = client.bugs.get(message.id)
    if (bug) {
        issue('Nininanou16/VirtualCrypto', bug.title, { token: client.settings.githubToken, body: bug.description }, (error, issue, info) => {
            if (error) {
                client.console.error(error)
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(client.colors.red)
                        .setTitle('Erreur lors de la publication de l\'issue sur github :')
                        .setDescription(error)
                );
            }

            message.channel.send(
                new MessageEmbed()
                    .setColor(client.colors.green)
                    .setDescription(`L'issue a bien été ouverte.\n${info.remaining} issues peuvent encore êtres ouvertes avant ${new Date(info.reset*1000).toLocaleString('fr-FR')}`)
            )
        })
    }
}