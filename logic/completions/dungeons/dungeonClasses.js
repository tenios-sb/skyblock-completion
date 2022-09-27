const BaseCompletion = require('../baseCompletion');

class DungeonClass extends BaseCompletion {

    constructor(type, max) {
        super(type.toLowerCase() + '_xp', type + ' Xp', 569809640, -1);
        this.type = type.toLowerCase();
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.dungeons?.player_classes[this.type]?.experience || 0;
    }

}

module.exports = DungeonClass