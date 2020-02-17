module.exports = {
    name: "command.slots.name",
    description: "command.slots.description",
    usage: "command.slots.usage",
    args: true,
    dm: true,
    cooldown: 5,
    async execute(message, args, client, Embeds) {
        let entryCostNum = 100;
        let appleWin = 150;
        let cherryWin = 250;
        let strawberryWin = 500;
        let moneybagWin = 1000;
        let diamondWin = 3000;

        client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [message.author.id], async (e, r) => {
            if (r.length == 1) {
                if (e) {
                    return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
                }
                if (r[0].cookies < 100) {
                    return Embeds.error(message.channel, await client.string(message.guild.id, "command.slots.cookiesError"));
                } else {
                    playSlots()
                }
            } else {
                client.con.query("INSERT INTO users(userid, cookies) VALUES(?, ?)", [message.author.id, 0]);
                return Embeds.error(message.channel, await client.string(message.guild.id, "command.slots.cookiesError"));
            }
        });

        async function addApple() {
            client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [message.author.id], async (e, r) => {
                client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r[0].cookies + appleWin, message.author.id]);
                let contents = [
                    [
                        await client.string(message.guild.id, "command.slots.result"),
                        "🍎🍎🍎",
                        true
                    ]
                ]
                return Embeds.uni(message.channel, (await client.string(message.guild.id, "command.slots.win")).replace("$cookies", appleWin), ":slot_machine: Slots :slot_machine:", contents, "", "", 0x7289DA);
            });
        }

        async function addCherry() {
            client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [message.author.id], async (e, r) => {
                client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r[0].cookies + cherryWin, message.author.id]);
                let contents = [
                    [
                        await client.string(message.guild.id, "command.slots.result"),
                        "🍒🍒🍒",
                        true
                    ]
                ]
                return Embeds.uni(message.channel, (await client.string(message.guild.id, "command.slots.win")).replace("$cookies", cherryWin), ":slot_machine: Slots :slot_machine:", contents, "", "", 0x7289DA);
            });
        }

        async function addStrawberry() {
            client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [message.author.id], async (e, r) => {
                client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r[0].cookies + strawberryWin, message.author.id]);
                let contents = [
                    [
                        await client.string(message.guild.id, "command.slots.result"),
                        "🍓🍓🍓",
                        true
                    ]
                ]
                return Embeds.uni(message.channel, (await client.string(message.guild.id, "command.slots.win")).replace("$cookies", strawberryWin), ":slot_machine: Slots :slot_machine:", contents, "", "", 0x7289DA);
            });
        }

        async function addmoneyBag() {
            client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [message.author.id], async (e, r) => {
                client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r[0].cookies + moneybagWin, message.author.id]);
                let contents = [
                    [
                        await client.string(message.guild.id, "command.slots.result"),
                        "💰💰💰",
                        true
                    ]
                ]
                return Embeds.uni(message.channel, (await client.string(message.guild.id, "command.slots.win")).replace("$cookies", moneybagWin), ":slot_machine: Slots :slot_machine:", contents, "", "", 0x7289DA);
            });
        }

        async function addDiamond() {
            client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [message.author.id], async (e, r) => {
                client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r[0].cookies + diamondWin, message.author.id]);
                let contents = [
                    [
                        await client.string(message.guild.id, "command.slots.result"),
                        "💎💎💎",
                        true
                    ]
                ]
                return Embeds.uni(message.channel, (await client.string(message.guild.id, "command.slots.win")).replace("$cookies", diamondWin), ":slot_machine: Slots :slot_machine:", contents, "", "", 0x7289DA);

            });
        }

        async function entryCost() {
            client.con.query("SELECT * FROM users WHERE userid = ? LIMIT 1;", [message.author.id], async (e, r) => {
                if (e) {
                    return Embeds.error(message.channel, "\`\`\`js\n" + e + "\`\`\`");
                }
                client.con.query("UPDATE users SET cookies = ? WHERE userid = ?", [r[0].cookies - 100, message.author.id]);
            });
        }

        async function playSlots() {
            let slots = ["🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍒", "🍒", "🍒", "🍒", "🍒", "🍒", "🍒", "🍒", "🍓", "🍓", "🍓", "🍓", "🍓", "🍓", "💰", "💰", "💰", "💰", "💎", "💎", "💎"];
            let result1 = slots[Math.floor((Math.random() * slots.length))];
            let result2 = slots[Math.floor((Math.random() * slots.length))];
            let result3 = slots[Math.floor((Math.random() * slots.length))];

            if (result1 === result2 && result1 === result3) {
                if (result1 === "🍎") {
                    addApple();
                }
                if (result1 === "🍒") {
                    addCherry();
                }
                if (result1 === "🍓") {
                    addStrawberry();
                }
                if (result1 === "💰") {
                    addmoneyBag();
                }
                if (result1 === "💎") {
                    addDiamond();
                }
            } else {
                entryCost();
                let contents = [
                    [
                        await client.string(message.guild.id, "command.slots.result"),
                        result1 + result2 + result3,
                        true
                    ]
                ]
                return Embeds.uni(message.channel, (await client.string(message.guild.id, "command.slots.lose")).replace("$cookies", entryCostNum), ":slot_machine: Slots :slot_machine:", contents, "", "", 0x7289DA);
            }
        }
    }
}