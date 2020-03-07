module.exports = {
    name: "command.hug.name",
    description: "command.hug.description",
    usage: "command.hug.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const NekoClient = require("nekos.life");
        const Neko = new NekoClient;
        
        let image = await Neko.sfw.hug().then(img => img.url);
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (target == message.member) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.hug.selfUser"));
        }
        if (!target) {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.hug.userRequired"));
        }
        if (target) {
            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.hug.hug")).replace("$user", target.user).replace("$member", message.member), "", image);
        }
    }
}