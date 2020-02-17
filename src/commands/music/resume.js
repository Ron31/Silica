module.exports = {
	name: "command.resume.name",
	description: "command.resume.description",
	usage: "command.resume.usage",
	args: true,
	dm: false,
	cooldown: 5,
	async execute(message, args, client, Embeds) {
		const {
			voiceChannel
		} = message.member;
		if (!voiceChannel) {
			return Embeds.notice(message.channel, await client.string(message.guild.id, "command.resume.userNotInChannel"));
		}
		if (voiceChannel !== message.guild.me.voiceChannel) {
			return Embeds.notice(message.channel, await client.string(message.guild.id, "command.resume.botNotInChannel"));
		}
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			if (message.member.hasPermission("MANAGE_GUILD") || message.member.hasPermission("MANAGE_MESSAGES") || message.author.id === client.config.owner) {
				serverQueue.playing = true;
				serverQueue.connection.dispatcher.resume();
				return Embeds.success(message.channel, await client.string(message.guild.id, "command.resume.resumed"));
			} else {
				return Embeds.error(message.channel, await client.string(message.guild.id, "command.resume.permsErrorUser"));
			}
		}
		return Embeds.error(message.channel, await client.string(message.guild.id, "command.resume.nothingPlaying"));
	}
}