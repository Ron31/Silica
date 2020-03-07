module.exports = {
    name: "command.stats.name",
    description: "command.stats.description",
    usage: "command.stats.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const os = require("os");

        let t = new Date(client.uptime);
        let months = t.getUTCMonth();
        let days = t.getUTCDate() - 1;
        let minutes = t.getUTCMinutes();
        let hours = t.getUTCHours();
        let seconds = t.getUTCSeconds();
        let uptime = `${months}mo, ${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
        let ping = `${Math.round(client.ws.ping)}ms`;

        let contents = [
            [
                await client.string(message.guild.id, "command.stats.servercount"),
                client.guilds.cache.size,
                true
            ],
            [
                await client.string(message.guild.id, "command.stats.usercount"),
                client.users.cache.size,
                true
            ],
            [
                await client.string(message.guild.id, "command.stats.channelcount"),
                client.channels.cache.size,
                true
            ],
            [
                await client.string(message.guild.id, "command.stats.voiceConnections"),
                client.voice.connections.size,
                true
            ],
            [
                await client.string(message.guild.id, "command.stats.uptime"),
                uptime,
                true
            ],
            [
                await client.string(message.guild.id, "command.stats.latency"),
                ping,
                true
            ],
            [
                await client.string(message.guild.id, "command.stats.ram"),
                `${((os.totalmem() - os.freemem()) / 1.074e+9).toFixed(2)}GiB / ${(os.totalmem() / 1.074e+9).toFixed(2)}GiB`,
                false
            ],
            [
                await client.string(message.guild.id, "command.stats.cpu"),
                `Chip: ${os.cpus()[0].model.split("@")[0]}`,
                false
            ]
        ]
        return Embeds.uni(message.channel, (await client.string(message.guild.id, "command.stats.createdBy")).replace("$owner", client.users.cache.get(client.config.owner).tag), "", contents, "", "https://cdn.discordapp.com/attachments/525393611261739040/635473876578467840/js.png", 0x7289DA);
    }
}