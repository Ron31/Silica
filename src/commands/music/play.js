module.exports = {
	name: "command.play.name",
	description: "command.play.description",
	usage: "command.play.usage",
	args: true,
	dm: false,
	cooldown: 10,
	async execute(message, args, client, Embeds) {
		const {
			Util
		} = require("discord.js");
		const ytdl = require("ytdl-core");
		const {
			voiceChannel
		} = message.member;
		if (!voiceChannel) {
			return Embeds.notice(message.channel, await client.string(message.guild.id, "command.play.userNotInChannel"));
		}
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has("CONNECT")) {
			return Embeds.error(message.channel, await client.string(message.guild.id, "command.play.permsErrorBotConnect"));
		}
		if (!permissions.has("SPEAK")) {
			return Embeds.error(message.channel, await client.string(message.guild.id, "command.play.permsErrorBotSpeak"));
		}
		if (!args[0]) {
			return Embeds.notice(message.channel, await client.string(message.guild.id, "command.play.linkRequired"));
		}

		let validate = await ytdl.validateURL(args[0]);
		let songl;
		if (!validate) {
			songl = await search(message, args, client, Embeds);
		} else {
			songl = args[0];
		}
		const serverQueue = message.client.queue.get(message.guild.id);
		const songInfo = await ytdl.getInfo(songl);

		let songHours = Math.floor(songInfo.player_response.videoDetails.lengthSeconds / 3600);
		let songMinutes = Math.floor(songInfo.player_response.videoDetails.lengthSeconds / 60);
		let songSeconds = Math.floor(songInfo.player_response.videoDetails.lengthSeconds - songMinutes * 60);

		const song = {
			id: songInfo.video_id,
			title: Util.escapeMarkdown(songInfo.title),
			url: songInfo.video_url,
			thumbnail: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
			duration: `${songHours}:${songMinutes}:${songSeconds}`,
			channel: songInfo.author.name
		}

		if (serverQueue) {
			serverQueue.songs.push(song);

			let contents = [
				[
					await client.string(message.guild.id, "command.play.channel"),
					song.channel,
					true
				],
				[
					await client.string(message.guild.id, "command.play.duration"),
					song.duration,
					true
				]
			]
			return Embeds.uni(message.channel, `[${song.title}](${song.url})`, await client.string(message.guild.id, "command.play.addedToQueue"), contents, "", song.thumbnail, 0x2ECC71);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		}
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				message.client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.playStream(await ytdl(song.url), {
					passes: 3
				})
				.on("end", reason => {
					if (reason === "Stream is not generating quickly enough") {
						return Embeds.error(message.channel, "Stream is not generating quickly enough");
					}
					queueConstruct.songs.shift();
					play(queueConstruct.songs[0]);
				})
				.on("error", e => {
					return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
				});
			dispatcher.setVolumeLogarithmic(queue.volume / 5);

			let contents = [
				[
					await client.string(message.guild.id, "command.play.channel"),
					song.channel,
					true
				],
				[
					await client.string(message.guild.id, "command.play.duration"),
					song.duration,
					true
				]
			]
			return Embeds.uni(queueConstruct.textChannel, `[${song.title}](${song.url})`, await client.string(message.guild.id, "command.play.start"), contents, "", song.thumbnail, 0x2ECC71);
		}
		try {
			const connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (e) {
			message.client.queue.delete(message.guild.id);
			await voiceChannel.leave();
			return Embeds.error(message.channel, (await client.string(message.guild.id, "command.play.joinError")).replace("$error", e));
		}
	}
}

function search(message, args, client, Embeds) {
	return new Promise(function (resolve, reject) {
		const search = require("yt-search");

		if (args.join(" ") !== "") {
			search(args.join(" "), async function (e, r) {
				let videos = r.videos.slice(0, 10);

				let response = "";

				for (var i in videos) {
					response += `${parseInt(i) + 1}: [${videos[i].title}](${videos[i].url})\n`;
				}

				Embeds.uni(message.channel, response, (await client.string(message.guild.id, "command.play.enterNumber")).replace("$videos", videos.length), "", "", "", 0x7289DA);

				const filter = music => !isNaN(music.content) && music.content < videos.length + 1 && music.content > 0;

				const collection = message.channel.createMessageCollector(filter);

				collection.videos = videos;

				collection.once("collect", function (music) {
					resolve(videos[parseInt(music.content) - 1].url);
				});
			});
		}
	});
}