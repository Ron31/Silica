module.exports = {
	name: "command.stop.name",
	description: "command.stop.description",
	usage: "command.stop.usage",
	args: true,
	dm: false,
	cooldown: 5,
	async execute(message, args, client, Embeds) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {
			return Embeds.notice(message.channel, await client.string(message.guild.id, "command.stop.userNotInChannel"));
		}
		if (voiceChannel !== message.guild.me.voice.channel) {
			return Embeds.notice(message.channel, await client.string(message.guild.id, "command.stop.botNotInChannel"));
		}
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) {
			return Embeds.error(message.channel, await client.string(message.guild.id, "command.stop.nothingPlaying"));
		}
		serverQueue.songs = [];
		if (message.member.hasPermission("MANAGE_GUILD") || message.author.id === client.config.owner) {
			serverQueue.connection.dispatcher.end();
			return Embeds.success(message.channel, await client.string(message.guild.id, "command.stop.stopped"));
		} else {
			return Embeds.error(message.channel, await client.string(message.guild.id, "command.stop.permsErrorUser"));
		}
	}
}