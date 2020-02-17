module.exports = {
    name: "command.kiss.name",
    description: "command.kiss.description",
    usage: "command.kiss.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const NekoClient = require("nekos.life");
        const Neko = new NekoClient; 
           
        let image = await Neko.sfw.kiss().then(img => img.url);
        let target = message.mentions.members.first() || message.guild.members.get(args[0]);
    
        if (target == message.member) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.kiss.selfUser"));
        }
        if (!target) {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.kiss.userRequired"));
        }
        if (target) {
            return Embeds.success(message.channel, (await client.string(message.guild.id, "command.kiss.kiss")).replace("$user", target.user).replace("$member", message.member), "", image);
        }
    }
}