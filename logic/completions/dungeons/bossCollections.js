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

class KuudraCollection extends BaseCompletion {

    constructor() {
        super('kuudra_collection', 'Kuudra Collection', 5000, -1);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = 0;
        this.value += profile?.nether_island_player_data?.kuudra_completed_tiers?.none || 0;
        this.value += 2 * (profile?.nether_island_player_data?.kuudra_completed_tiers?.hot || 0);
        this.value += 3 * (profile?.nether_island_player_data?.kuudra_completed_tiers?.burning || 0);
        this.value += 4 * (profile?.nether_island_player_data?.kuudra_completed_tiers?.fiery || 0);
        this.value += 5 * (profile?.nether_island_player_data?.kuudra_completed_tiers?.infernal || 0);
    }

}

module.exports = { BossCollection, KuudraCollection }