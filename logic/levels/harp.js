const BaseLevel = require('./baseLevel');

class Harp extends BaseLevel {

    constructor() {
        super('harp', 'Harp Songs', 210);
        this.xpTable = {
            hymn_joy: 5,
            frere_jacques: 5,
            amazing_grace: 5,
            brahms: 10,
            happy_birthday: 10,
            greensleeves: 10,
            jeopardy: 15,
            minuet: 15,
            joy_world: 15,
            pure_imagination: 25,
            vie_en_rose: 25,
            fire_and_flames: 35,
            pachelbel: 35
        }
    }


    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        Object.keys(this.xpTable).forEach(song => {
            if (profile?.harp_quest?.[`song_${song}_best_completion`] === 1)
                this.xp += this.xpTable[song];
        })
    }
}

module.exports = Harp