module.exports = {
    name: "command.urban.name",
    description: "command.urban.description",
    usage: "command.urban.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const urban = require("urban");

        if (message.channel.nsfw || message.channel.type == "dm") {
            if (args.join(" ") !== "") {
                urban(args.join(" ")).first(async result => {
                    if (!result) {
                        return Embeds.error(message.channel, await client.string(message.guild.id, "command.urban.noResult"));
                    }
                    let contents = [
                        [
                            ":thumbsup:",
                            result.thumbs_up,
                            true
                        ],
                        [
                            ":thumbsdown:",
                            result.thumbs_down,
                            true
                        ]
                    ]
                    return Embeds.uni(message.channel, result.definition, result.word, contents, "", "", 0x7289DA);
                });
            } else {
                return Embeds.notice(message.channel, await client.string(message.guild.id, "command.urban.definitionRequired"));
            }
        } else {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.urban.noNSFW"));
        }
    }
}