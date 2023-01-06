const BaseLevel = require('./baseLevel');

class Arachne extends BaseLevel {

    constructor() {
        super('arachne', 'Defeat Arachne', 60);
    }


    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        if (profile?.bestiary?.kills_arachne_300 > 0)
            this.xp += 20;
        if (profile?.bestiary?.kills_arachne_500 > 0)
            this.xp += 40;
    }
}

class Dragons extends BaseLevel {

    constructor() {
        super('dragons', 'Slay Dragons', 200);
        //superior twice cause 50 xp lmfao
        this.dragons = ['unstable', 'wise', 'old', 'protector', 'strong', 'young', 'superior', 'superior']
    }


    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        this.dragons.forEach(dragon => {
            if (profile?.bestiary?.[`kills_${dragon}_dragon_100`] > 0)
                this.xp += 25;
        })
    }
}

class Kuudra extends BaseLevel {

    constructor() {
        super('kuudra_completion', 'Defeat Kuudra', 300);
    }


    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        if (profile?.nether_island_player_data?.kuudra_completed_tiers?.none > 0)
            this.xp += 20;
        if (profile?.nether_island_player_data?.kuudra_completed_tiers?.hot > 0)
            this.xp += 40;
        if (profile?.nether_island_player_data?.kuudra_completed_tiers?.burning > 0)
            this.xp += 60;
        if (profile?.nether_island_player_data?.kuudra_completed_tiers?.fiery > 0)
            this.xp += 80;
        if (profile?.nether_island_player_data?.kuudra_completed_tiers?.infernal > 0)
            this.xp += 100;
    }
}


module.exports = { Dragons, Arachne, Kuudra }