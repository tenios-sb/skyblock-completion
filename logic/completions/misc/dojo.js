const BaseCompletion = require('../baseCompletion');

class Dojo extends BaseCompletion {

    constructor(type, key) {
        super('dojo_' + type.toLowerCase(), 'Dojo Test of ' + type, 1000, -1);
        this.key = key;
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.nether_island_player_data?.dojo?.['dojo_points_' + this.key] || 0;
    }

}

module.exports = Dojo