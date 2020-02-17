module.exports = {
    name: "command.uptime.name",
    description: "command.uptime.description",
    usage: "command.uptime.usage",
    args: true,
    dm: true,
    owner: true,
    cooldown: 2,
    async execute(message, args, client, Embeds) {
        let t = new Date(client.uptime);
        let months = t.getUTCMonth();
        let days = t.getUTCDate() - 1;
        let minutes = t.getUTCMinutes();
        let hours = t.getUTCHours();
        let seconds = t.getUTCSeconds();
        let uptime = months + await client.string(message.guild.id, "command.uptime.months") + days + await client.string(message.guild.id, "command.uptime.days") + hours + await client.string(message.guild.id, "command.uptime.hours") + minutes + await client.string(message.guild.id, "command.uptime.minutes") + seconds + await client.string(message.guild.id, "command.uptime.seconds")

        return Embeds.success(message.channel, uptime);
    }
}