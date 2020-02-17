module.exports = {
    name: "command.neko.name",
    description: "command.neko.description",
    usage: "command.neko.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const NekoClient = require("nekos.life");
        const Neko = new NekoClient;
        
        let image = await Neko.sfw.neko().then(img => img.url);

        return Embeds.success(message.channel, "", "", image);
    }
}