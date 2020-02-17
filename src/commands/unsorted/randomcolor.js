module.exports = {
    name: "command.randomcolor.name",
    description: "command.randomcolor.description",
    usage: "command.randomcolor.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        let randomcolor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
        return Embeds.uni(message.channel, (await client.string(message.guild.id, "command.randomcolor.colorCode")).replace("$color", randomcolor), await client.string(message.guild.id, "command.randomcolor.colorCodeTitle"), "", "", "", randomcolor);
    }
}