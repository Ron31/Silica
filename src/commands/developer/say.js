module.exports = {
    name: "command.say.name",
    description: "command.say.description",
    usage: "command.say.usage",
    args: true,
    dm: false,
    owner: true,
    cooldown: 2,
    async execute(message, args, client, Embeds) {
        message.delete();
        return message.channel.send(args.join(" "));
    }
}