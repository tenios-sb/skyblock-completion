const BaseLevel = require('./baseLevel');

class FairySouls extends BaseLevel {

    constructor() {
        super('fairy_souls', 'Fairy Souls', 470);
    }


    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 10 * (profile?.fairy_exchanges || 0);
    }
}

module.exports = FairySouls