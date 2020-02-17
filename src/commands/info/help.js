module.exports = {
    name: "command.help.name",
    description: "command.help.description",
    usage: "command.help.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        const fs = require("fs");

        if (args != [] && args[0]) {
            if (client.commands.has(args[0])) {
                let command = client.commands.get(args[0]);

                let isDM = "";
                if (command.dm == true) {
                    isDM = await client.string(message.guild.id, "command.help.isDM.yes");
                } else {
                    isDM = await client.string(message.guild.id, "command.help.isDM.no");
                }

                let contents = [
                    [
                        await client.string(message.guild.id, "command.help.embed.description"),
                        await client.string(message.guild.id, command.description),
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.help.embed.usage"),
                        "``" + client.config.prefix + await client.string(message.guild.id, command.usage) + "``",
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.help.embed.isDM"),
                        isDM,
                        false
                    ],
                    [
                        await client.string(message.guild.id, "command.help.embed.cooldown"),
                        `${command.cooldown} ` + await client.string(message.guild.id, "command.help.embed.cooldown.seconds"),
                        false
                    ]
                ]
                return Embeds.uni(message.channel, "", (await client.string(message.guild.id, command.name)), contents, "", "", 0x7289DA);
            } else {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.help.commandNotFound"));
            }
        } else {
            let isDev = "";

            if (message.author.id === client.config.owner) {
                isDev = generateCommands("developer", client.config.prefix);
            } else {
                isDev = await client.string(message.guild.id, "command.help.noDev");
            }

            let contents = [
                [
                    "Developer",
                    isDev,
                    false
                ],
                [
                    "Configuration",
                    generateCommands("configuration", client.config.prefix),
                    false
                ],
                [
                    "Economy",
                    generateCommands("economy", client.config.prefix),
                    false
                ],
                [
                    "General",
                    generateCommands("general", client.config.prefix),
                    false
                ],
                [
                    "Image",
                    generateCommands("image", client.config.prefix),
                    false
                ],
                [
                    "Info",
                    generateCommands("info", client.config.prefix),
                    false
                ],
                [
                    "Moderation",
                    generateCommands("moderation", client.config.prefix),
                    false
                ],
                [
                    "Music",
                    generateCommands("music", client.config.prefix),
                    false
                ],
                [
                    "Roleplay",
                    generateCommands("roleplay", client.config.prefix),
                    false
                ],
                [
                    "Unsorted",
                    generateCommands("unsorted", client.config.prefix),
                    false
                ]
            ]
            return Embeds.uni(message.channel, "", await client.string(message.guild.id, "command.help.title"), contents, "", "", 0x36393F);

            function generateCommands(category) {
                if (!category) {
                    return false;
                }
                let commandsListed = "";
                let group = fs.readdirSync(`./src/commands/${category}`);
                for (let command of group) {
                    if (!command.endsWith(".js")) {
                        return;
                    }
                    commandsListed += " `" + client.config.prefix + command.split(".")[0] + "`,";
                }
                commandsListed = commandsListed.slice(0, -1);
                return commandsListed;
            }
        }
    }
}