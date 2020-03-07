module.exports = {
    name: "command.userinfo.name",
    description: "command.userinfo.description",
    usage: "command.userinfo.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds, Vars) {
        const Discord = require("discord.js");
        const moment = require("moment");

        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let perms = [];

        let compare = (a, b) => {
            if (a.position > b.position) return -1;
            if (a.position < b.position) return 1;
            return 0;
        }

        try {
            Object.entries(Discord.Permissions.FLAGS).forEach(element => {
                if (target.hasPermission(element[0])) {
                    perms += `\`\`${element[0].toLowerCase()}\`\`, `
                }
            });

            if (target) {
                let UserGotColor = "";
                let UserGotNickname = "";
                let UserGotActivity = "";
                let UserGotAvatar = "";

                if (target.roles.highest.color == 0x000000) {
                    UserGotColor = 0x7289DA;
                } else {
                    UserGotColor = target.roles.highest.color;
                }
                if (target.user.username != target.displayName) {
                    UserGotNickname = target.displayName;
                } else {
                    UserGotNickname = "-";
                }
                if (target.user.presence.activities) {
                    UserGotActivity = `${target.user.presence.activities}`;
                } else {
                    UserGotActivity = "-";
                }
                if (target.user.avatarURL()) {
                    UserGotAvatar = target.user.avatarURL();
                } else {
                    UserGotAvatar = target.user.defaultAvatarURL();
                }

                let contents = [
                    [
                        await client.string(message.guild.id, "command.userinfo.nameAndDis"),
                        target.user.tag,
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.userinfo.nickname"),
                        UserGotNickname,
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.userinfo.id"),
                        target.id,
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.userinfo.status"),
                        Vars.status[target.user.presence.status],
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.userinfo.activity"),
                        UserGotActivity,
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.userinfo.roles"),
                        target.roles.cache.sort(compare).map(roles => roles).join(", ").substr(0, 900) || `-`,
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.userinfo.permissions"),
                        perms.substr(0, 1000),
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.userinfo.createdAt"),
                        moment(target.user.createdAt).format("dddd, Do MMMM YYYY, HH:mm:ss"),
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.userinfo.joinedAt"),
                        moment(target.joinedAt).format("dddd, Do MMMM YYYY, HH:mm:ss"),
                        true
                    ],
                    [
                        await client.string(message.guild.id, "command.userinfo.avatar"),
                        UserGotAvatar,
                        false
                    ]
                ]
                return Embeds.uni(message.channel, "", target.user.username, contents, "", UserGotAvatar, UserGotColor);
            }
        } catch (e) {
            return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
        }
    }
}