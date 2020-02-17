module.exports = {
    name: "command.channelinfo.name",
    description: "command.channelinfo.description",
    usage: "command.channelinfo.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const moment = require("moment");

        let channel = message.guild.channels.find(channel => channel.name === args.join(" "));

        if (args.join(" ") !== "") {
            if (!channel) {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.channelinfo.channelNotExist"));
            }
            if (channel) {
                let isNSFW = "";

                if (channel.nsfw) {
                    isNSFW = await client.string(message.guild.id, "command.channelinfo.isNSFW.yes");
                } else {
                    isNSFW = await client.string(message.guild.id, "command.channelinfo.isNSFW.no");
                }

                let contents = [
                    [
                        await client.string(message.guild.id, "command.channelinfo.embed.name"),
                        channel.name,
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.channelinfo.embed.id"),
                        channel.id,
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.channelinfo.embed.nsfw"),
                        isNSFW,
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.channelinfo.createdAt"),
                        moment(channel.createdAt).format("dddd, Do MMMM YYYY, HH:mm:ss"),
                        false
                    ]
                ]
                return Embeds.uni(message.channel, "", "", contents, "", "", 0x7289DA);
            }
        } else {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.channelinfo.channelRequired"));
        }
    }
}