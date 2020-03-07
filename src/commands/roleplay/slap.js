module.exports = {
    name: "command.slap.name",
    description: "command.slap.description",
    usage: "command.slap.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const NekoClient = require("nekos.life");
        const Neko = new NekoClient;    
        
        let image = await Neko.sfw.slap().then(img => img.url);
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
        if (target == message.member) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.slap.selfUser"));
        }
        if (!target) {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.slap.userRequired"));
        }
        if (target) {
            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.slap.slap")).replace("$user", target.user).replace("$member", message.member), "", image);
        }
    }
}