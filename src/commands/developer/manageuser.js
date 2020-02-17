module.exports = {
    name: "command.manageuser.name",
    description: "command.manageuser.description",
    usage: "command.manageuser.usage",
    args: true,
    dm: false,
    owner: true,
    cooldown: 2,
    async execute(message, args, client, Embeds) {
        let values = ["description", "switchfc", "battletag", "color", "steam"];
        let isDeleting = false;
        let valueNames = {
            "description": "Description",
            "switchfc": "Switch Friendcode",
            "battletag": "BattleTag",
            "color": "Profile Color",
            "steam": "Steam Username"
        }

        let target = message.mentions.members.first() || message.guild.members.get(args[0]);
        let value = args[1];
        let text = args.slice(2).join(" ");

        if (!target) {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.manageuser.userRequired"));
        }
        if (target.user.bot == true) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.manageuser.isBot"));
        }
        if (!value) {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.manageuser.propertyRequired"));
        }
        if (!text) {
            return Embeds.notice(message.channel, await client.string(message.guild.id, "command.manageuser.valueRequired"));
        }
        if (!values.includes(value)) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.manageuser.validProperty"));
        }
        if (value != "description" && args.length > 3) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.manageuser.spaceError"));
        }
        if (value == "color" && text != "delete" && (!text.includes("#") || text.length != 7)) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.manageuser.validColor"));
        }
        if (value == "description" && text.length > 1024) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.manageuser.descErrorLength"));
        }
        if (value == "switchfc" && text.length > 17) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.manageuser.switchErrorLength"));
        }
        if (value == "switchfc" && !text.startsWith("SW-")) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.manageuser.switchErrorStart"));
        }
        if (value == "battletag" && text.length > 128) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.manageuser.overwatchErrorLength"));
        }
        if (value == "steam" && text.length > 128) {
            return Embeds.error(message.channel, await client.string(message.guild.id, "command.manageuser.steamErrorLength"));
        }

        client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [target.id], async (e, r) => {
            if (e) {
                return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
            }
            if (text == "delete") {
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
                client.con.query("UPDATE users SET " + value + "=? WHERE userid = ?", [text, target.id]);
            } else {
                client.con.query("INSERT INTO users(userid, ?) VALUES (?, ?)", [value, target.id, text]);
            }
            if (isDeleting) {
                return Embeds.success(message.channel, (await client.string(message.guild.id, "command.manageuser.valueReset")).replace("$value", valueNames[value]).replace("$user", target.user.tag));
            } else {
                return Embeds.success(message.channel, (await client.string(message.guild.id, "command.manageuser.valueSet")).replace("$value", valueNames[value]).replace("$user", target.user.tag));
            }
        });
    }
}