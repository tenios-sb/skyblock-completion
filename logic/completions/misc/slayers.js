const BaseCompletion = require('../baseCompletion');

class Slayer extends BaseCompletion {

    constructor(type) {
        super(type.toLowerCase(), type + ' XP', 1000000);
        this.type = type.toLowerCase();
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.slayer_bosses?.[this.type]?.xp || 0;
    }

}

module.exports = Slayer