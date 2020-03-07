module.exports = {
	name: "command.pause.name",
	description: "command.pause.description",
	usage: "command.pause.usage",
	args: true,
	dm: false,
	cooldown: 5,
	async execute(message, args, client, Embeds) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {
			return Embeds.error(message.channel, await client.string(message.guild.id, "command.pause.userNotInChannel"));
		}
		if (voiceChannel !== message.guild.me.voice.channel) {
			return Embeds.error(message.channel, await client.string(message.guild.id, "command.pause.botNotInChannel"));
		}
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			if (message.member.hasPermission("MANAGE_GUILD") || message.member.hasPermission("MANAGE_MESSAGES") || message.author.id === client.config.owner) {
				serverQueue.playing = false;
				serverQueue.connection.dispatcher.pause();
				return Embeds.success(message.channel, await client.string(message.guild.id, "command.pause.paused"));
			} else {
				return Embeds.error(message.channel, await client.string(message.guild.id, "command.pause.permsErrorUser"));
			}
		}
		return Embeds.error(message.channel, await client.string(message.guild.id, "command.pause.nothingPlaying"));
	}
}