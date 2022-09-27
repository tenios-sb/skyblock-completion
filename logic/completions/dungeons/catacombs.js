const BaseCompletion = require('../baseCompletion');

class Catacombs extends BaseCompletion {

    constructor() {
        super('catacombs_xp', 'Catacombs Xp', 569809640, -1);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.dungeons?.dungeon_types?.catacombs?.experience || 0;
    }

}

module.exports = Catacombs