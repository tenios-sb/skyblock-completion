const { getMojangInfo, getHypixelPlayer, getHypixelSkyblockProfiles, getGuild } = require('./util/apiRequests')
const Profile = require('./profile')

class Player {

    constructor(username, uuid = null, guild = null) {
        this.profiles = [];
        this.username = username;
        this.uuid = uuid;
        this.guild = guild;
    }

    async init() {
        if (!this.uuid) {
            let { username, uuid } = await getMojangInfo(this.username);
            if (!uuid) {
                console.log('Couldnt find valid mojang info for ' + this.username);
                return;
            }
            this.uuid = uuid;
            this.username = username;
        }

        const promises = [getHypixelPlayer(this.uuid), getHypixelSkyblockProfiles(this.uuid)];
        if (!this.guild) promises.push(getGuild(this.uuid));
        return await Promise.all(promises).then(([hypixelPlayer, hypixelSkyblockProfiles, guild]) => {
            if (!hypixelPlayer) {
                console.log('Error requesting player data for ' + this.username);
                return;
            }
            this.hypixelPlayer = hypixelPlayer.player;
            if (!this.username)
                this.username = this.hypixelPlayer.displayname;
            if (!hypixelSkyblockProfiles) {
                console.log('Error requesting skyblock profile data for ' + this.username);
                return;
            }
            if (!this.guild)
                this.guild = guild?.name;
            this.hypixelSkyblockProfiles = hypixelSkyblockProfiles.profiles;
            if (!this.hypixelSkyblockProfiles) {
                console.log('Player does not seem to have any skyblock profiles');
                return;
            }
            for (let profileData of this.hypixelSkyblockProfiles) {
                const profile = new Profile(this.uuid, profileData, this.hypixelPlayer);
                this.profiles.push(profile);
            }
            return Promise.all(this.profiles.map(profile => profile.calculateCompletion()));
        }, (err) => console.log(err));

    }

    findLatestProfile() {
        let lastTime = -1;
        this.profiles.forEach(profile => {
            if (profile.lastPlayed > lastTime) {
                this.latestProfile = profile;
                lastTime = profile.lastPlayed;
            }
        })
    }

    getProfile(profileName) {
        for (let profile of this.profiles) {
            if (profile.name.toLowerCase() === profileName.toLowerCase().trim())
                return profile;
        }
        return this.latestProfile;
    }

    toJsonObject() {
        let object = {};
        object._id = this.uuid;
        object.name = this.username;
        object.latest = this.latestProfile.name;
        object.lastUpdate = Date.now();
        object.guild = this.guild;
        object.profiles = this.profiles.map(profile => profile.toJsonObject())
        return object;
    }

    static async getPlayerByName(name) {
        const player = new Player(name);
        await player.init();
        player.findLatestProfile();
        return Promise.resolve(player);
    }

    static async updateGuild(db, guildName) {
        const guildData = await getGuild(null, guildName)
        db.collection('players').updateMany({
            guild: guildData?.name
        }, {
            $unset: { guild: "" }
        });
        let i = 1;
        if (!guildData) return
        console.log('Updating guild ' + guildData?.name);
        for (let member of guildData?.members || []) {
            console.log('Updating ' + member.uuid + ' (' + i + '/' + guildData?.members?.length + ')');
            const player = new Player(null, member.uuid, guildData.name);
            await player.init();
            player.findLatestProfile();
            if (player.profiles.length > 0)
                //add to db
                db.collection('players').updateOne({ _id: player.uuid }, { $set: player.toJsonObject() }, { upsert: true });
            i++;
            await new Promise((resolve) => setTimeout(resolve, 1500));
        }

    }
}

module.exports = Player