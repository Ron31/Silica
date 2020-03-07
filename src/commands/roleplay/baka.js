module.exports = {
    name: "command.baka.name",
    description: "command.baka.description",
    usage: "command.baka.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const NekoClient = require("nekos.life");
        const Neko = new NekoClient;   
         
        let image = await Neko.sfw.baka().then(img => img.url);
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
        if (target == message.member) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.baka.selfUser"));
        }
        if (!target) {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.baka.userRequired"));
        }
        if (target) {
            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.baka.baka")).replace("$user", target.user), "", image);
        }
    }
}