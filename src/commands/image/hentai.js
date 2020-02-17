module.exports = {
    name: "command.hentai.name",
    description: "command.hentai.description",
    usage: "command.hentai.usage",
    args: true,
    dm: false,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const NekoClient = require("nekos.life");
        const Neko = new NekoClient;
        
        let image = await Neko.nsfw.hentai().then(img => img.url);
    
        if (message.channel.nsfw) {
            return Embeds.success(message.channel, "", "", image);
        } else {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.hentai.noNSFW"));
        }
    }
}