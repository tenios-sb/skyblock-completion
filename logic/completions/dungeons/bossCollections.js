const BaseCompletion = require('../baseCompletion');

class BossCollection extends BaseCompletion {

    constructor(floor) {
        super('catacombs_floor_' + floor, 'Floor ' + floor + ' Completions', 1000, -1);
        this.floor = floor;
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.dungeons?.dungeon_types?.catacombs?.tier_completions?.[this.floor] || 0;
        this.value += profile?.dungeons?.dungeon_types?.master_catacombs?.tier_completions?.[this.floor] || 0;
    }

}

module.exports = BossCollection