const BaseCompletion = require('../baseCompletion');

class Hotm extends BaseCompletion {

    constructor() {
        super('hotm', 'Heart of the Mountain', 347000, -1);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.mining_core?.experience || 0;
    }

}

module.exports = Hotm