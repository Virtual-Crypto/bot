const request = require('request')
const { inspect } = require("util");
const ownerid = ["369564132770578432","574258696662810644"];
const { post } = require("snekfetch");
const {MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: 'eval',
    aliases: ['e'],
    category:"utility",
    description: 'Evaluate code',
    async run(client, message, args){

        if (!ownerid.includes(message.author.id)) return;

        var embed = new MessageEmbed().setDescription("Working on it...");

        message.channel.send(embed).then(async (msg) => {
            try {
                const code = await eval(args.join(" ")); // Store the eval code to a variable
                const inspected = await inspect(code); // inspect the code eval output

                if (inspected.toString().length < 1900 - message.content.length) {
                    embed = new MessageEmbed().setDescription(
                        `\`\`\`js\n${args.join(
                            " "
                        )}\n\`\`\`\n\n\`\`\`js\n${inspected}\n\`\`\``
                    );
                    msg.edit(embed);
                } else {
                    await post("https://hastebin.com/documents")
                        .send(inspected.toString())
                        .then((response) => {
                            embed = new MessageEmbed().setDescription(
                                `\`\`\`js\n${args.join(" ")}\`\`\`\n\nhttps://hastebin.com/${
                                    response.body.key
                                }`
                            );

                            msg.edit(embed);
                        })
                        .catch((_err) => {
                            embed = new MessageEmbed().setDescription(
                                `:warning: Hastebin is down [0-1800] \`\`\`js\n${inspected
                                    .toString()
                                    .substring(0, 1800)}\`\`\``
                            );
                            return msg.edit(embed);
                        });
                }
            } catch (e) {
                embed = new MessageEmbed().setDescription(
                    `There was an error with eval.\n\n:x: Error: \`\`\`js\n${e}\`\`\``
                );

                msg.edit(embed);
            }
        });
    }
}

/*
hvfhdbvhd
 */