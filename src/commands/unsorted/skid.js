module.exports = {
    name: "command.skid.name",
    description: "command.skid.description",
    usage: "command.skid.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const fs = require("fs");

        let folder = args[0];
        let command = args.slice(1).join(" ");
        let link = ("https://github.com/newtox/Silica/tree/master/src/commands/" + `${folder}/` + command + ".js").toString();

        try {
            if (folder && command) {
                var commandskid = fs.readFileSync(`src/commands/${folder}/${command}.js`).toString();
                message.channel.send("\`\`\`js\n" + commandskid.substr(0, 1900) + "\`\`\`");
                return Embeds.success(message.channel, `[${command}.js](${link})`, await client.string(message.guild.id, "command.skid.code"));
            } else {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.skid.itemsRequired"));
            }
        } catch (e) {
            return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
        }
    }
}