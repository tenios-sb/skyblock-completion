const BaseLevel = require('./baseLevel');

const cumulativeXp = [
    50, 125, 235, 395, 625, 955, 1425, 2095, 3045, 4385, 6275, 8940, 12700, 17960, 25340, 35640, 50040, 70040, 97640, 135640, 188140, 259640,
    356640, 488640, 668640, 911640, 1239640, 1684640, 2284640, 3084640, 4149640, 5559640, 7459640, 9959640, 13259640, 17559640, 23159640,
    30359640, 39559640, 51559640, 66559640, 85559640, 109559640, 139559640, 177559640, 225559640, 285559640, 360559640, 453559640, 569809640
];

class DungeonCompletions extends BaseLevel {

    constructor() {
        super('floor_completions', 'Complete Dungeons', 540);
    }


    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        for (let i = 0; i < 5; i++) {
            if (profile?.dungeons?.dungeon_types?.catacombs?.tier_completions?.[i] > 0)
                this.xp += 20;
        }
        for (let i = 5; i <= 7; i++) {
            if (profile?.dungeons?.dungeon_types?.catacombs?.tier_completions?.[i] > 0)
                this.xp += 30;
        }
        for (let i = 1; i <= 7; i++) {
            if (profile?.dungeons?.dungeon_types?.master_catacombs?.tier_completions?.[i] > 0)
                this.xp += 50;
        }
    }
}

class BossCollections extends BaseLevel {

    constructor() {
        super('boss_collections', 'Dungeon Boss Collection', 1015);
        this.lowTiers = ['bonzo_red_nose', 'bonzo_bonzo_mask', 'bonzo_gold_bonzo_head',
            'scarf_red_scarf', 'scarf_scarf_thesis', 'scarf_gold_scarf_head',
            'professor_suspicious_vial', 'professor_adaptive_leggings', 'professor_gold_professor_head',
            'thorn_spirit_decoy', 'thorn_gold_thorn_head', 'thorn_spirit_bow',
            'livid_dark_orb', 'livid_gold_livid_head', 'livid_livid_dagger',
            'sadan_giant_tooth', 'sadan_gold_sadan_head', 'sadan_necromancer_helmet',
            'necron_wither_blood', 'necron_gold_necron_head', 'necron_wither_helmet',
        ];
        this.highTiers = ['bonzo_bonzo_staff', 'bonzo_recombobulator', 'bonzo_diamond_bonzo_head',
            'scarf_stone_blade', 'scarf_recombobulator', 'scarf_diamond_scarf_head',
            'professor_adaptive_chestplate', 'professor_recombobulator', 'professor_diamond_professor_head',
            'thorn_recombobulator', 'thorn_spirit_boots', 'thorn_diamond_thorn_head',
            'livid_recombobulator', 'livid_last_breath', 'livid_shadow_chestplate', 'livid_diamond_livid_head',
            'sadan_recombobulator', 'sadan_necromancer_chestplate', 'sadan_necromancer_sword', 'sadan_diamond_sadan_head',
            'necron_recombobulator', 'necron_wither_leggings', 'necron_wither_chestplate', 'necron_diamond_necron_head'];
    }

    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        this.lowTiers.forEach(tier => {
            if ((profile?.tutorial || []).includes(`boss_collection_claimed_${tier}`))
                this.xp += 15;
        });
        this.highTiers.forEach(tier => {
            if ((profile?.tutorial || []).includes(`boss_collection_claimed_${tier}`))
                this.xp += 25;
        });
        let kuudraCollection = 0;
        kuudraCollection += profile?.nether_island_player_data?.kuudra_completed_tiers?.none || 0;
        kuudraCollection += 2 * (profile?.nether_island_player_data?.kuudra_completed_tiers?.hot || 0);
        kuudraCollection += 3 * (profile?.nether_island_player_data?.kuudra_completed_tiers?.burning || 0);
        kuudraCollection += 4 * (profile?.nether_island_player_data?.kuudra_completed_tiers?.fiery || 0);
        kuudraCollection += 5 * (profile?.nether_island_player_data?.kuudra_completed_tiers?.infernal || 0);
        if (kuudraCollection >= 5000) this.xp += 30
        if (kuudraCollection >= 2000) this.xp += 25
        if (kuudraCollection >= 500) this.xp += 20
        if (kuudraCollection >= 100) this.xp += 15
        if (kuudraCollection >= 10) this.xp += 10
    }
}

class CataXp extends BaseLevel {

    constructor() {
        super('cata_xp', 'Catacombs Level Up', 1220);
    }

    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        let level = 0;
        let cataXp = profile?.dungeons?.dungeon_types?.catacombs?.experience || 0;
        for (; level < 50; level++) {
            if (cumulativeXp[level] > cataXp)
                break;
        }
        for (; level > 0; level--) {
            if (level > 39)
                this.xp += 40;
            else
                this.xp += 20;
        }
    }
}

class ClassXp extends BaseLevel {

    constructor() {
        super('class_xp', 'Class Level Up', 1000);
    }

    //note, currently bugged, cata 50 doesnt give any xp
    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        Object.values(profile?.dungeons?.player_classes || {}).forEach(dungeonClass => {
            let level = 0;
            let cataXp = dungeonClass?.experience || 0;
            for (; level < 50; level++) {
                if (cumulativeXp[level] > cataXp)
                    break;
            }
            this.xp += level * 4;
        });
    }
}

module.exports = { DungeonCompletions, BossCollections, CataXp, ClassXp }