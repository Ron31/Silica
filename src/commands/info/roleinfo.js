module.exports = {
    name: "command.roleinfo.name",
    description: "command.roleinfo.description",
    usage: "command.roleinfo.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const moment = require("moment");

        let role = message.guild.roles.find(role => role.name === args.join(" "));

        if (args.join(" ") !== "") {
            if (!role) {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.roleinfo.roleNotExist"));
            }
            if (role) {
                let isColor = "";
                let isMentionable = "";
                let isHoisted = "";
                let isManaged = "";

                if (role.hexColor == 0x000000) {
                    isColor = 0x7289DA;
                } else {
                    isColor = role.hexColor;
                }
                if (role.mentionable) {
                    isMentionable = await client.string(message.guild.id, "command.roleinfo.isMentionable.yes");
                } else {
                    isMentionable = await client.string(message.guild.id, "command.roleinfo.isMentionable.no");
                }
                if (role.hoist) {
                    isHoisted = await client.string(message.guild.id, "command.roleinfo.isHoisted.yes");
                } else {
                    isHoisted = await client.string(message.guild.id, "command.roleinfo.isHoisted.no");
                }
                if (role.managed) {
                    isManaged = await client.string(message.guild.id, "command.roleinfo.isManaged.yes");
                } else {
                    isManaged = await client.string(message.guild.id, "command.roleinfo.isManaged.yes");
                }

                let contents = [
                    [
                        await client.string(message.guild.id, "command.roleinfo.embed.name"),
                        role.name,
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.roleinfo.embed.id"),
                        role.id,
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.roleinfo.embed.position"),
                        message.guild.roles.size - role.position,
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.roleinfo.membersInRole"),
                        role.members.size,
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.roleinfo.color"),
                        role.hexColor,
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.roleinfo.mentionable"),
                        isMentionable,
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.roleinfo.hoisted"),
                        isHoisted,
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.roleinfo.managed"),
                        isManaged,
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.roleinfo.createdAt"),
                        moment(role.createdAt).format("dddd, Do MMMM YYYY, HH:mm:ss"),
                        true
                    ]
                ]
                return Embeds.uni(message.channel, "", "", contents, "", "", isColor);
            }
        } else {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.roleinfo.roleRequired"));
        }
    }
}