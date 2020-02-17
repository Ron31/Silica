module.exports = {
    name: "command.ping.name",
    description: "command.ping.description",
    usage: "command.ping.usage",
    args: true,
    dm: true,
    owner: true,
    cooldown: 2,
    async execute(message, args, client, Embeds) {
        return Embeds.success(message.channel, `${Math.round(client.ping)}ms`);
    }
}