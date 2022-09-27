const BaseCompletion = require('../baseCompletion');

const essenceCosts = {
    'undead': {
        'catacombs_boss_luck': { 0: 0, 1: 100, 2: 1100, 3: 11100, 4: 111000 },
        'catacombs_looting': { 0: 0, 1: 1000, 2: 3000, 3: 6000, 4: 1000, 5: 15000 },
        'revive_stone': { 0: 0, 1: 200000 },
        'catacombs_health': { 0: 0, 1: 1000, 2: 3500, 3: 8500, 4: 18500, 5: 42500 },
        'catacombs_defense': { 0: 0, 1: 1000, 2: 5000, 3: 11000, 4: 19000, 5: 29000 },
        'catacombs_strength': { 0: 0, 1: 1000, 2: 5000, 3: 11000, 4: 19000, 5: 29000 },
        'catacombs_intelligence': { 0: 0, 1: 1000, 2: 5000, 3: 11000, 4: 19000, 5: 29000 },
        'catacombs_crit_damage': { 0: 0, 1: 1000, 2: 4000, 3: 14000, 4: 34000, 5: 84000 }
    },
    'wither': {
        'permanent_health': { 0: 0, 1: 100, 2: 350, 3: 850, 4: 1850, 5: 3350 },
        'permanent_defense': { 0: 0, 1: 100, 2: 350, 3: 850, 4: 1850, 5: 3350 },
        'permanent_intelligence': { 0: 0, 1: 100, 2: 350, 3: 850, 4: 1850, 5: 3350 },
        'permanent_strength': { 0: 0, 1: 100, 2: 350, 3: 850, 4: 1850, 5: 3350 },
        'permanent_speed': { 0: 0, 1: 100, 2: 350 },
        'forbidden_blessing': { 0: 0, 1: 200, 2: 600, 3: 1000, 4: 1800, 5: 2800, 6: 4000, 7: 5400, 8: 7000, 9: 8800, 10: 10800 }
    }
}

class EssenceShop extends BaseCompletion {

    constructor(type, max) {
        super(type.toLowerCase() + '_essence_shop', type + ' Essence Shop', max, -1);
        this.type = type.toLowerCase();
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = 0;
        for (const [perk, tier] of Object.entries(profile?.perks || {})) {
            if (perk in essenceCosts[this.type])
                this.value += essenceCosts[this.type][perk][tier]
        }
        this.value += profile?.[`essence_${this.type}`] || 0;
    }

}

module.exports = EssenceShop