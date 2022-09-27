const BaseCompletion = require('../baseCompletion');

class FairySouls extends BaseCompletion {

    constructor() {
        super('fairy_souls', 'Fairy Souls', 238, 3);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.fairy_souls_collected || 0;
    }

}

module.exports = FairySouls