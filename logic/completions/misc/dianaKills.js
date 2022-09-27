const BaseCompletion = require('../baseCompletion');

class DianaKills extends BaseCompletion {

    constructor() {
        super('mythological_kills', 'Mythological Kills', 10000, -1);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.stats?.mythos_kills || 0;
    }

}

module.exports = DianaKills