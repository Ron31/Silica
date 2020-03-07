module.exports = {
    name: "command.pat.name",
    description: "command.pat.description",
    usage: "command.pat.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const NekoClient = require("nekos.life");
        const Neko = new NekoClient;
        
        let image = await Neko.sfw.pat().then(img => img.url);
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (target == message.member) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.pat.selfUser"));
        }
        if (!target) {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.pat.userRequired"));
        }
        if (target) {
            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.pat.pat")).replace("$user", target.user).replace("$member", message.member), "", image);
        }
    }
}