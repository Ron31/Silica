const con = require("./Database.js");

function strings(guild, strings) {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM languages WHERE guildid = ?", [guild], async (e, r) => {        
            let language;


            if (!r[0]) {
                language = "en_us";
                con.query("INSERT INTO languages (guildid, lang) VALUES (?,?)", [guild, language]);
            } else {
                language = r[0].lang;
            }

            let languageSelected = require("./../languages/" + language + ".json");
            resolve(languageSelected[strings]);
        });
    });
}

module.exports = strings;