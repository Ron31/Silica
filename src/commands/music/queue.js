module.exports = {
	name: "command.queue.name",
	description: "command.queue.description",
	usage: "command.queue.usage",
	args: true,
	dm: false,
	cooldown: 5,
	async execute(message, args, client, Embeds) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {
			return Embeds.notice(message.channel, await client.string(message.guild.id, "command.queue.userNotInChannel"));
		}
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) {
			return Embeds.error(message.channel, await client.string(message.guild.id, "command.queue.nothingPlaying"));
		}
		return Embeds.uni(message.channel, `${serverQueue.songs.map(song => `**-** [${song.title}](${song.url})`).join('\n')}`, (await client.string(message.guild.id, "command.queue.queue")).replace("$guild", message.guild.name), "", "", "", 0x7289DA);

	}
}