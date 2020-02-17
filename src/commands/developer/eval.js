module.exports = {
    name: "command.eval.name",
    description: "command.eval.description",
    usage: "command.eval.usage",
    args: true,
    dm: false,
    owner: true,
    cooldown: 2,
    async execute(message, args, client, Embeds) {
        try {
            let command = args.join(" ");
            let evaled = await eval(command);
            return Embeds.success(message.channel, "\`\`\`js\n" + evaled + "\`\`\`");
        } catch (e) {
            return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
        }
    }
}