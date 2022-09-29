const BaseLevel = require('./baseLevel');

class SlayerKills extends BaseLevel {

    constructor() {
        super('slayer_kills', 'Defeat Slayers', 825);
        this.slayers = {
            zombie: 4,
            spider: 3,
            wolf: 3,
            enderman: 3,
            blaze: 3
        }

        this.xpTable = {
            0: 25,
            1: 25,
            2: 50,
            3: 50,
            4: 75
        }
    }


    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        Object.keys(this.slayers).forEach(slayer => {
            for (let i = 0; i <= this.slayers[slayer]; i++) {
                if (profile?.slayer_bosses?.[slayer]?.[`boss_kills_tier_${i}`] > 0) {
                    this.xp += this.xpTable[i];
                }
            }
        })
    }
}

class SlayerLevels extends BaseLevel {

    constructor() {
        super('slayer_levels', 'Slayers Level Up', 3625);

        this.xpTable = {
            1: 15,
            2: 25,
            3: 35,
            4: 50,
            5: 75,
            6: 100,
            7: 125,
            8: 150,
            9: 150
        }
    }

    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        Object.values(profile?.slayer_bosses || {}).forEach(slayer => {
            for (let i = 1; i <= 9; i++) {
                if (slayer?.claimed_levels?.[`level_${i}`])
                    this.xp += this.xpTable[i];
            }
        })
    }
}

module.exports = { SlayerKills, SlayerLevels }