require("dotenv").config();
const fs = require("fs");
const mysql = require("mysql2");
const {
	join
} = require("path");
const DiscordClient = require("./struct/Client");
const Embeds = require("./struct/Embed");
const Database = require("./struct/Database.js");
const strings = require("./struct/String.js")
const Vars = require("../vars.json");
const Discord = require("discord.js");
const client = new DiscordClient({
	token: process.env.token,
	prefix: process.env.prefix,
	owner: process.env.owner,
	mysqlhost: process.env.mysqlhost,
	mysqluser: process.env.mysqluser,
	mysqldb: process.env.mysqldb,
	mysqlpw: process.env.mysqlpw,
});

client.con = Database;
client.string = strings;

console.log("Commands loading");
for (let folder of fs.readdirSync(join(__dirname, "commands"))) {
	for (let file of fs.readdirSync(join(__dirname, `commands/${folder}`))) {
		console.log(`- Loading file ` + file.split(",")[0]);
		var command = require(join(__dirname, `commands/${folder}/${file}`));
		client.commands.set(file.split(".")[0], command);
	}
}

console.log("Events loading");
for (let file of fs.readdirSync(join(__dirname, `events`))) {
	console.log(`- Loading event ` + file.split(",")[0]);
	var event = require(join(__dirname, `events/${file}`));
	var eventName = file.split(".")[0];
	client.on(eventName, event.bind(null, client));
}

client.once("ready", () => console.log("READY!"));
setInterval(async function () {
	let presences = [{
		text: `over ${client.users.size} users`,
		type: "WATCHING"
	}, {
		text: `over ${client.guilds.size} guilds`,
		type: "WATCHING"
	}, {
		text: `with version 2.1`,
		type: "PLAYING"
	}, {
		text: `DMs`,
		type: "LISTENING"
	}, {
		text: `music`,
		type: "LISTENING"
	}, {
		text: `commands`,
		type: "LISTENING"
	}, {
		text: `${client.config.prefix}help`,
		type: "PLAYING"
	}];
	let random = presences[Math.floor(Math.random() * presences.length)];
	client.user.setActivity(random.text, {
		type: random.type
	});
}, 30000);

client.on("message", message => {
	if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
	const args = message.content.slice(client.config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);
	// if (!command) return;
	if (message.channel.type == "dm" || message.channel.type == "text") {
		if (!command) {
			return Embeds.error(message.channel, "Sorry, I couldn't find that command");
		}
		if (message.channel.type == "dm" && client.commands.get(commandName).dm == false) {
			return Embeds.error(message.channel, "I can't execute that command inside DMs");
		}
	}
	if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = client.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return Embeds.error(message.channel, `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${commandName}\` command`);
		}
	}
	if (command.owner == true && message.author.id !== client.config.owner) {
		return Embeds.dev(message.channel);
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	try {
		command.execute(message, args, client, Embeds, Vars);
	} catch (e) {
		return Embeds.error(message.channel, "There was an error trying to execute that command");
	}
});

client.login(client.config.token);