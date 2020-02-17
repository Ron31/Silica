module.exports = {
	name: "command.np.name",
	description: "command.np.description",
	usage: "command.np.usage",
	args: true,
	dm: false,
	cooldown: 5,
	async execute(message, args, client, Embeds) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) {
			return Embeds.error(message.channel, await client.string(message.guild.id, "command.np.nothingPlaying"));
		}
		return Embeds.success(message.channel, (await client.string(message.guild.id, "command.np.currentSong")).replace("$song", `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`));
	}
}