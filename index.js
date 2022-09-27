const db = require('./logic/database');
const Discord = require('./discord/discordBot');
const dbName = 'sb-completion';

db.connect().then(() => {
    new Discord(db.db(dbName));
});