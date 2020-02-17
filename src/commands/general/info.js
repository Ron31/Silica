module.exports = {
    name: "command.info.name",
    description: "command.info.description",
    usage: "command.info.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        let contents = [
            [
                await client.string(message.guild.id, "command.info.allPermissions"),
                (await client.string(message.guild.id, "command.info.invite")).replace("$invite", "Invite").replace("$link", await client.generateInvite(2146958847)),
            ],
            [
                await client.string(message.guild.id, "command.info.corePermissions"),
                (await client.string(message.guild.id, "command.info.invite")).replace("$invite", "Invite").replace("$link", await client.generateInvite(51264)),
            ],
            [
                await client.string(message.guild.id, "command.info.noPermissions"),
                (await client.string(message.guild.id, "command.info.invite")).replace("$invite", "Invite").replace("$link", await client.generateInvite()),
            ],
            [
                await client.string(message.guild.id, "command.info.support"),
                (await client.string(message.guild.id, "command.info.invite")).replace("$invite", "Invite").replace("$link", "https://discord.gg/dF9VayQ"),
            ],
            [
                await client.string(message.guild.id, "command.info.github"),
                (await client.string(message.guild.id, "command.info.invite")).replace("$invite", "Link").replace("$link", "https://github.com/newtox/Silicia"),
            ],
            [
                await client.string(message.guild.id, "command.info.glenn"),
                (await client.string(message.guild.id, "command.info.invite")).replace("$invite", "Vote").replace("$link", "https://glennbotlist.xyz/bot/619842083175399425/vote"),
            ],
            [
                await client.string(message.guild.id, "command.info.discordbotlist"),
                (await client.string(message.guild.id, "command.info.invite")).replace("$invite", "Vote").replace("$link", "https://discordbotlist.com/bots/619842083175399425"),
            ],
            [
                await client.string(message.guild.id, "command.info.abstractlist"),
                (await client.string(message.guild.id, "command.info.invite")).replace("$invite", "Vote").replace("$link", "https://abstractlist.net/bot/619842083175399425"),
            ],
            [
                await client.string(message.guild.id, "command.info.botsfordiscord"),
                (await client.string(message.guild.id, "command.info.invite")).replace("$invite", "Vote").replace("$link", "https://botsfordiscord.com/bot/619842083175399425"),
            ]
        ]
        return Embeds.uni(message.channel, "", (await client.string(message.guild.id, "command.info.programmedBy")).replace("$owner", client.users.get(client.config.owner).tag), contents, "", "", 0x7289DA);
    }
}