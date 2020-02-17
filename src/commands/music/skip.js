module.exports = {
	name: "command.skip.name",
	description: "command.skip.description",
	usage: "command.skip.usage",
	args: true,
	dm: false,
	cooldown: 5,
	async execute(message, args, client, Embeds) {
		const {
			voiceChannel
		} = message.member;
		if (!voiceChannel) {
			return Embeds.notice(message.channel, await client.string(message.guild.id, "command.skip.userNotInChannel"));
		}
		if (voiceChannel !== message.guild.me.voiceChannel) {
			return Embeds.notice(message.channel, await client.string(message.guild.id, "command.skip.botNotInChannel"));
		}
		const serverQueue = message.client.queue.get(message.guild.id);

		if (!serverQueue) {
			return Embeds.error(message.channel, await client.string(message.guild.id, "command.skip.nothingPlaying"));
		}
		let amountSkip = Math.ceil(voiceChannel.members.size / 2)
		if (!serverQueue.songs[0].voteSkips) serverQueue.songs[0].voteSkips = [];
		if (serverQueue.songs[0].voteSkips.includes(message.member.id)) {
			return Embeds.error(message.channel, (await client.string(message.guild.id, "command.skip.voted")).replace("$user", message.member.user.tag).replace("$votes", `${serverQueue.songs[0].voteSkips.length}/${amountSkip}`));
		}

		serverQueue.songs[0].voteSkips.push(message.member.id);
		message.client.queue.set(message.guild.id, serverQueue);
		if (serverQueue.songs[0].voteSkips.length >= amountSkip || message.member.hasPermission("MANAGE_GUILD") || message.author.id === client.config.owner) {
			Embeds.success(message.channel, await client.string(message.guild.id, "command.skip.skipped"));
			return serverQueue.connection.dispatcher.end();
		}

		return Embeds.success(message.channel, (await client.string(message.guild.id, "command.skip.votes")).replace("$votes", `${serverQueue.songs[0].voteSkips.length}/${amountSkip}`));
	}
}