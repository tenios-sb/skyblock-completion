const BaseCompletion = require('../baseCompletion');

class KuudraWave extends BaseCompletion {

    constructor() {
        super('kuudra_wave', 'Highest Kuudra Wave', 500);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = 0;
        let t1 = profile?.nether_island_player_data?.kuudra_completed_tiers?.highest_wave_none || 0;
        let t2 = profile?.nether_island_player_data?.kuudra_completed_tiers?.highest_wave_hot || 0;
        let t3 = profile?.nether_island_player_data?.kuudra_completed_tiers?.highest_wave_fiery || 0;
        let t4 = profile?.nether_island_player_data?.kuudra_completed_tiers?.highest_wave_burning || 0;
        let t5 = profile?.nether_island_player_data?.kuudra_completed_tiers?.highest_wave_infernal || 0;
        this.value += Math.max(t1, t2, t3, t4, t5);
        this.value += Math.max(t2, t3, t4, t5);
        this.value += Math.max(t3, t4, t5);
        this.value += Math.max(t4, t5);
        this.value += t5;
    }

}

module.exports = KuudraWave