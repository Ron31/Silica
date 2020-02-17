module.exports = {
    name: "command.updateprofile.name",
    description: "command.updateprofile.description",
    usage: "command.updateprofile.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        if (args.length >= 2) {
            let values = ["description", "switchfc", "battletag", "color", "steam"];
            let isDeleting = false;
            let valueNames = {
                "description": "Description",
                "switchfc": "Switch Friendcode",
                "battletag": "BattleTag",
                "color": "Profile Color",
                "steam": "Steam Username"
            }

            let value = args[0];
            let text = args.slice(1).join(" ");

            if (!values.includes(value)) {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.updateprofile.validProperty"));
            }
            if (value != "description" && args.length > 2) {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.updateprofile.spaceError"));
            }
            if (value == "color" && text != "reset" && (!text.includes("#") || text.length != 7)) {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.updateprofile.validColor"));
            }
            if (value == "description" && text.length > 1024) {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.updateprofile.descErrorLength"));
            }
            if (value == "switchfc" && text.length > 17) {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.updateprofile.switchErrorLength"));
            }
            if (value == "switchfc" && !text.startsWith("SW-")) {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.updateprofile.switchErrorStart"));
            }
            if (value == "battletag" && text.length > 128) {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.updateprofile.overwatchErrorLength"));
            }
            if (value == "steam" && text.length > 128) {
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.updateprofile.steamErrorLength"));
            }

            client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [message.author.id], async (e, r) => {
                if (e) {
                    return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
                }
                if (text == "reset") {
                    isDeleting = true;
                    if (value == "description") {
                        text = "No description set";
                    } else if (value == "color") {
                        text = "#36393F";
                    } else {
                        text = "None set";
                    }
                }
                if (r.length == 1) {
                    client.con.query("UPDATE users SET " + value + "=? WHERE userid = ?", [text, message.author.id]);
                } else {
                    client.con.query("INSERT INTO users(userid, ?) VALUES (?, ?)", [value, message.author.id, text]);
                }
                if (isDeleting) {
                    return Embeds.success(message.channel, (await client.string(message.guild.id, "command.updateprofile.valueReset")).replace("$value", valueNames[value]))
                } else {
                    return Embeds.success(message.channel, (await client.string(message.guild.id, "command.updateprofile.valueSet")).replace("$value", valueNames[value]))
                }
            });
        } else {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.updateprofile.length"));
        }
    }
}