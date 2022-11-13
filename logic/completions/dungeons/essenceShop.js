const BaseCompletion = require('../baseCompletion');

const essenceCosts = {
    'undead': {
        'catacombs_boss_luck': { 0: 0, 1: 100, 2: 1100, 3: 11100, 4: 111100 },
        'catacombs_looting': { 0: 0, 1: 1000, 2: 3000, 3: 6000, 4: 1000, 5: 15000 },
        'revive_stone': { 0: 0, 1: 200000 },
        'catacombs_health': { 0: 0, 1: 1000, 2: 3500, 3: 8500, 4: 18500, 5: 43500 },
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
    },
    'dragon': {
        'flat_damage_vs_ender': { 0: 0, 1: 100, 2: 300, 3: 600, 4: 1000, 5: 1500 },
        'mana_after_ender_kill': { 0: 0, 1: 100, 2: 200, 3: 300, 4: 400, 5: 500, 6: 600, 7: 700, 8: 800, 9: 900, 10: 1000 },
        'fero_vs_dragons': { 0: 0, 1: 125, 2: 375, 3: 875, 4: 1875, 5: 3375 },
        'inc_zealots_odds': { 0: 0, 1: 150, 2: 650, 3: 1900, 4: 3900, 5: 6900 },
        'combat_wisdom_in_end': { 0: 0, 1: 250, 2: 1500, 3: 6500 },
        'edrag_cd': { 0: 0, 1: 500, 2: 2000, 3: 4500, 4: 8000, 5: 12000 },
        'dragon_reforges_buff': { 0: 0, 1: 1500, 2: 3750, 3: 7000, 4: 11500, 5: 18000 },
        'increased_sup_chances': { 0: 0, 1: 2000 }
    },
    'spider': {
        'empowered_agility': { 0: 0, 1: 50, 2: 125, 3: 225, 4: 375, 5: 625, 6: 1025, 7: 1775, 8: 2775, 9: 4525, 10: 7025 },
        'vermin_control': { 0: 0, 1: 100, 2: 600, 3: 1600, 4: 4600, 5: 9600 },
        'bane': { 0: 0, 1: 100, 2: 600, 3: 1600, 4: 4600, 5: 9600 },
        'spider_training': { 0: 0, 1: 250, 2: 1500, 3: 6500 }
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