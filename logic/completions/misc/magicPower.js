const BaseCompletion = require('../baseCompletion');

const taliData = {
    WOLF_TALISMAN: { line: 'WOLF', rarity: 0 },
    WOLF_RING: { line: 'WOLF', rarity: 2 },

    POTION_AFFINITY_TALISMAN: { line: 'POTION', rarity: 0 },
    RING_POTION_AFFINITY: { line: 'POTION', rarity: 1 },
    ARTIFACT_POTION_AFFINITY: { line: 'POTION', rarity: 2 },

    FEATHER_TALISMAN: { line: 'FEATHER', rarity: 0 },
    FEATHER_RING: { line: 'FEATHER', rarity: 1 },
    FEATHER_ARTIFACT: { line: 'FEATHER', rarity: 2 },

    SEA_CREATURE_TALISMAN: { line: 'SEA_CREATURE', rarity: 0 },
    SEA_CREATURE_RING: { line: 'SEA_CREATURE', rarity: 1 },
    SEA_CREATURE_ARTIFACT: { line: 'SEA_CREATURE', rarity: 2 },

    HEALING_TALISMAN: { line: 'HEALING', rarity: 0 },
    HEALING_RING: { line: 'HEALING', rarity: 1 },

    CANDY_TALISMAN: { line: 'CANDY', rarity: 1 },
    CANDY_RING: { line: 'CANDY', rarity: 2 },
    CANDY_ARTIFACT: { line: 'CANDY', rarity: 3 },
    CANDY_RELIC: { line: 'CANDY', rarity: 4 },

    INTIMIDATION_TALISMAN: { line: 'INTIMIDATION', rarity: 0 },
    INTIMIDATION_RING: { line: 'INTIMIDATION', rarity: 1 },
    INTIMIDATION_ARTIFACT: { line: 'INTIMIDATION', rarity: 2 },

    SPIDER_TALISMAN: { line: 'SPIDER', rarity: 1 },
    SPIDER_RING: { line: 'SPIDER', rarity: 2 },
    SPIDER_ARTIFACT: { line: 'SPIDER', rarity: 3 },

    RED_CLAW_TALISMAN: { line: 'RED_CLAW', rarity: 1 },
    RED_CLAW_RING: { line: 'RED_CLAW', rarity: 2 },
    RED_CLAW_ARTIFACT: { line: 'RED_CLAW', rarity: 3 },

    HUNTER_TALISMAN: { line: 'HUNTER', rarity: 1 },
    HUNTER_RING: { line: 'HUNTER', rarity: 2 },

    ZOMBIE_TALISMAN: { line: 'ZOMBIE', rarity: 0 },
    ZOMBIE_RING: { line: 'ZOMBIE', rarity: 1 },
    ZOMBIE_ARTIFACT: { line: 'ZOMBIE', rarity: 2 },

    BAT_TALISMAN: { line: 'BAT', rarity: 2 },
    BAT_RING: { line: 'BAT', rarity: 3 },
    BAT_ARTIFACT: { line: 'BAT', rarity: 4 },

    BROKEN_PIGGY_BANK: { line: 'PIGGY', rarity: 1 },
    CRACKED_PIGGY_BANK: { line: 'PIGGY', rarity: 1 },
    PIGGY_BANK: { line: 'PIGGY', rarity: 1 },

    SPEED_TALISMAN: { line: 'SPEED', rarity: 0 },
    SPEED_RING: { line: 'SPEED', rarity: 1 },
    SPEED_ARTIFACT: { line: 'SPEED', rarity: 2 },

    PERSONAL_COMPACTOR_4000: { line: 'COMPACTOR', rarity: 1 },
    PERSONAL_COMPACTOR_5000: { line: 'COMPACTOR', rarity: 2 },
    PERSONAL_COMPACTOR_6000: { line: 'COMPACTOR', rarity: 3 },
    PERSONAL_COMPACTOR_7000: { line: 'COMPACTOR', rarity: 4 },

    PERSONAL_DELETOR_4000: { line: 'DELETOR', rarity: 1 },
    PERSONAL_DELETOR_5000: { line: 'DELETOR', rarity: 2 },
    PERSONAL_DELETOR_6000: { line: 'DELETOR', rarity: 3 },
    PERSONAL_DELETOR_7000: { line: 'DELETOR', rarity: 4 },

    SCARF_STUDIES: { line: 'SCARF', rarity: 2 },
    SCARF_THESIS: { line: 'SCARF', rarity: 3 },
    SCARF_GRIMOIRE: { line: 'SCARF', rarity: 4 },

    CAT_TALISMAN: { line: 'CAT', rarity: 1 },
    LYNX_TALISMAN: { line: 'CAT', rarity: 2 },
    CHEETAH_TALISMAN: { line: 'CAT', rarity: 3 },

    SHADY_RING: { line: 'SEAL', rarity: 1 },
    CROOKED_ARTIFACT: { line: 'SEAL', rarity: 2 },
    SEAL_OF_THE_FAMILY: { line: 'SEAL', rarity: 3 },

    TREASURE_TALISMAN: { line: 'TREASURE', rarity: 2 },
    TREASURE_RING: { line: 'TREASURE', rarity: 3 },
    TREASURE_ARTIFACT: { line: 'TREASURE', rarity: 4 },

    BEASTMASTER_CREST_COMMON: { line: 'BEASTMASTER', rarity: 0 },
    BEASTMASTER_CREST_UNCOMMON: { line: 'BEASTMASTER', rarity: 1 },
    BEASTMASTER_CREST_RARE: { line: 'BEASTMASTER', rarity: 2 },
    BEASTMASTER_CREST_EPIC: { line: 'BEASTMASTER', rarity: 3 },
    BEASTMASTER_CREST_LEGENDARY: { line: 'BEASTMASTER', rarity: 4 },

    RAGGEDY_SHARK_TOOTH_NECKLACE: { line: 'SHARK', rarity: 0 },
    DULL_SHARK_TOOTH_NECKLACE: { line: 'SHARK', rarity: 1 },
    HONED_SHARK_TOOTH_NECKLACE: { line: 'SHARK', rarity: 2 },
    SHARP_SHARK_TOOTH_NECKLACE: { line: 'SHARK', rarity: 3 },
    RAZOR_SHARP_SHARK_TOOTH_NECKLACE: { line: 'SHARK', rarity: 4 },

    BAT_PERSON_TALISMAN: { line: 'BAT_PERSON', rarity: 0 },
    BAT_PERSON_RING: { line: 'BAT_PERSON', rarity: 1 },
    BAT_PERSON_ARTIFACT: { line: 'BAT_PERSON', rarity: 2 },

    LUCKY_HOOF: { line: 'HOOF', rarity: 1 },
    ETERNAL_HOOF: { line: 'HOOF', rarity: 2 },

    WITHER_ARTIFACT: { line: 'WITHER', rarity: 3 },
    WITHER_RELIC: { line: 'WITHER', rarity: 4 },

    WEDDING_RING_0: { line: 'WEDDING', rarity: 0 },
    WEDDING_RING_1: { line: 'WEDDING', rarity: 1 },
    WEDDING_RING_2: { line: 'WEDDING', rarity: 1 },
    WEDDING_RING_3: { line: 'WEDDING', rarity: 2 },
    WEDDING_RING_4: { line: 'WEDDING', rarity: 2 },
    WEDDING_RING_5: { line: 'WEDDING', rarity: 2 },
    WEDDING_RING_6: { line: 'WEDDING', rarity: 2 },
    WEDDING_RING_7: { line: 'WEDDING', rarity: 3 },
    WEDDING_RING_8: { line: 'WEDDING', rarity: 3 },
    WEDDING_RING_9: { line: 'WEDDING', rarity: 4 },

    //cba to do this, doing it manually instead
    //CAMPFIRE_TALISMAN_29: { line: 'CAMPFIRE', rarity: 4 },

    JERRY_TALISMAN_GREEN: { line: 'JERRY', rarity: 1 },
    JERRY_TALISMAN_BLUE: { line: 'JERRY', rarity: 2 },
    JERRY_TALISMAN_PURPLE: { line: 'JERRY', rarity: 3 },
    JERRY_TALISMAN_GOLDEN: { line: 'JERRY', rarity: 4 },

    TITANIUM_TALISMAN: { line: 'TITANIUM', rarity: 1 },
    TITANIUM_RING: { line: 'TITANIUM', rarity: 2 },
    TITANIUM_ARTIFACT: { line: 'TITANIUM', rarity: 3 },
    TITANIUM_RELIC: { line: 'TITANIUM', rarity: 4 },

    BAIT_RING: { line: 'BAIT', rarity: 2 },
    SPIKED_ATROCITY: { line: 'BAIT', rarity: 3 },

    MASTER_SKULL_TIER_1: { line: 'MASTER', rarity: 0 },
    MASTER_SKULL_TIER_2: { line: 'MASTER', rarity: 0 },
    MASTER_SKULL_TIER_3: { line: 'MASTER', rarity: 1 },
    MASTER_SKULL_TIER_4: { line: 'MASTER', rarity: 1 },
    MASTER_SKULL_TIER_5: { line: 'MASTER', rarity: 2 },
    MASTER_SKULL_TIER_6: { line: 'MASTER', rarity: 3 },
    MASTER_SKULL_TIER_7: { line: 'MASTER', rarity: 4 },

    SOULFLOW_PILE: { line: 'SOULFLOW', rarity: 1 },
    SOULFLOW_BATTERY: { line: 'SOULFLOW', rarity: 2 },
    SOULFLOW_SUPERCELL: { line: 'SOULFLOW', rarity: 3 },

    ENDER_ARTIFACT: { line: 'ENDER', rarity: 3 },
    ENDER_RELIC: { line: 'ENDER', rarity: 4 },

    POWER_TALISMAN: { line: 'POWER', rarity: 0 },
    POWER_RING: { line: 'POWER', rarity: 1 },
    POWER_ARTIFACT: { line: 'POWER', rarity: 2 },

    BINGO_TALISMAN: { line: 'BINGO', rarity: 0 },
    BINGO_RING: { line: 'BINGO', rarity: 1 },
    BINGO_ARTIFACT: { line: 'BINGO', rarity: 2 },

    BURSTSTOPPER_TALISMAN: { line: 'BURSTSTOPPER', rarity: 2 },
    BURSTSTOPPER_ARTIFACT: { line: 'BURSTSTOPPER', rarity: 3 },

    ODGERS_BRONZE_TOOTH: { line: 'ODGER', rarity: 0 },
    ODGERS_SILVER_TOOTH: { line: 'ODGER', rarity: 1 },
    ODGERS_GOLD_TOOTH: { line: 'ODGER', rarity: 2 },
    ODGERS_DIAMOND_TOOTH: { line: 'ODGER', rarity: 3 },

    PARTY_HAT_CRAB: { line: 'CRAB', rarity: 1 },
    PARTY_HAT_CRAB_ANIMATED: { line: 'CRAB', rarity: 1 },

    FARMING_TALISMAN: { line: 'FARMING', rarity: 0 },
    VACCINE_TALISMAN: { line: 'VACCINE', rarity: 0 },
    WOOD_TALISMAN: { line: 'WOOD', rarity: 1 },
    SKELETON_TALISMAN: { line: 'SKELETON', rarity: 0 },
    COIN_TALISMAN: { line: 'COIN', rarity: 0 },
    MAGNETIC_TALISMAN: { line: 'MAGNETIC', rarity: 1 },
    GRAVITY_TALISMAN: { line: 'GRAVITY', rarity: 1 },
    VILLAGE_TALISMAN: { line: 'VILLAGE', rarity: 0 },
    MINE_TALISMAN: { line: 'MINE', rarity: 0 },
    NIGHT_VISION_CHARM: { line: 'NIGHT_VISION', rarity: 0 },
    LAVA_TALISMAN: { line: 'LAVA', rarity: 1 },
    SCAVENGER_TALISMAN: { line: 'SCAVENGER', rarity: 0 },
    FIRE_TALISMAN: { line: 'FIRE', rarity: 0 },
    PIGS_FOOT: { line: 'PIG', rarity: 2 },
    WOLF_PAW: { line: 'PAW', rarity: 1 },
    FROZEN_CHICKEN: { line: 'CHICKEN', rarity: 2 },
    FISH_AFFINITY_TALISMAN: { line: 'FISH', rarity: 2 },
    FARMER_ORB: { line: 'FARMER', rarity: 1 },
    HASTE_RING: { line: 'HASTE', rarity: 2 },
    EXPERIENCE_ARTIFACT: { line: 'EXP', rarity: 3 },
    NEW_YEAR_CAKE_BAG: { line: 'CAKE', rarity: 1 },
    DAY_CRYSTAL: { line: 'DAY', rarity: 2 },
    NIGHT_CRYSTAL: { line: 'NIGHT', rarity: 2 },
    MELODY_HAIR: { line: 'MELODY', rarity: 3 },
    DEVOUR_RING: { line: 'DEVOUR', rarity: 2 },
    TARANTULA_TALISMAN: { line: 'TARANTULA', rarity: 3 },
    SURVIVOR_CUBE: { line: 'SURVIVOR', rarity: 2 },
    POTATO_TALISMAN: { line: 'POTATO', rarity: 0 },
    EMERALD_RING: { line: 'EMERALD', rarity: 1 },
    HEGEMONY_ARTIFACT: { line: 'HEGE', rarity: 4 },
    BITS_TALISMAN: { line: 'BITS', rarity: 2 },
    CATACOMBS_EXPERT_RING: { line: 'CATA', rarity: 3 },
    AUTO_RECOMBOBULATOR: { line: 'RECOMB', rarity: 4 },
    KING_TALISMAN: { line: 'KING', rarity: 0 },
    REAPER_ORB: { line: 'REAPER', rarity: 4 },
    DANTE_TALISMAN: { line: 'DANTE', rarity: 0 },
    BLOOD_GOD_CREST: { line: 'BLOOD', rarity: 0 },
    POCKET_ESPRESSO_MACHINE: { line: 'ESPRESSO', rarity: 0 },
    HANDY_BLOOD_CHALICE: { line: 'CHALICE', rarity: 0 },
    JUNGLE_AMULET: { line: 'JUNGLE', rarity: 1 },
    MINERAL_TALISMAN: { line: 'MINERAL', rarity: 2 },
    NETHER_ARTIFACT: { line: 'NETHER', rarity: 3 },
    JACOBUS_REGISTER: { line: 'JACOBUS', rarity: 4 },
    BLAZE_TALISMAN: { line: 'BLAZE', rarity: 2 },
    NETHERRACK_LOOKING_SUNSHADE: { line: 'SUNSHADE', rarity: 0 },
    SHENS_REGALIA: { line: 'SHEN', rarity: 4 },
    ARTIFACT_OF_CONTROL: { line: 'CONTROL', rarity: 4 },
    PANDORAS_BOX: { line: 'PANDORA', rarity: 4 },
    CHUMMING_TALISMAN: { line: 'CHUM', rarity: 1 },
    PULSE_RING: { line: 'PULSE', rarity: 1 },
}


class MagicPower extends BaseCompletion {

    constructor() {
        super('magic_power', 'Magic Power', 1197, -1);
    }

    async calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        const talismans = await this.getTalismanContents(profile?.talisman_bag?.data);
        this.value = 0;
        let talismanObj = {};
        if (!talismans) return;
        talismans.forEach(talisman => {
            const name = talisman?.tag?.value?.ExtraAttributes?.value?.id?.value || 'invalid'
            if (name === 'invalid') return;
            var rarity = 0;
            var line = 'invalid';
            if (name.includes('CAMPFIRE_TALISMAN')) {
                const level = parseInt(name.split('_').pop()) + 1 || 0;
                if (level > 4) rarity++;
                if (level > 8) rarity++;
                if (level > 13) rarity++;
                if (level > 21) rarity++;
                if (talisman?.tag?.value?.ExtraAttributes?.value?.rarity_upgrades?.value === 1)
                    rarity++;
                line = 'CAMPFIRE';
            } else if (name === 'PANDORAS_BOX') {
                switch (talisman?.tag?.value?.ExtraAttributes?.value?.['pandora-rarity']?.value || 'COMMON') {
                    case "COMMON":
                        rarity = 0;
                        break;
                    case "UNCOMMON":
                        rarity = 1;
                        break;
                    case "RARE":
                        rarity = 2;
                        break;
                    case "EPIC":
                        rarity = 3;
                        break;
                    case "LEGENDARY":
                        rarity = 4;
                        break;
                    case "MYTHIC":
                        rarity = 5;
                        break;
                };
                line = 'PANDORA';
            } else {
                if (!(name in taliData)) {
                    console.log('Found unknown talisman: ' + name);
                    return;
                }
                rarity = taliData[name].rarity;
                line = taliData[name].line;
                //check for recombs
                if (talisman?.tag?.value?.ExtraAttributes?.value?.rarity_upgrades?.value === 1 && line !== 'CRAB')
                    rarity++;
                if (name === 'POWER_ARTIFACT') {
                    let gems = talisman?.tag?.value?.ExtraAttributes?.value?.gems?.value;
                    if (gems?.RUBY_0?.value === "PERFECT" &&
                        gems?.JADE_0?.value === "PERFECT" &&
                        gems?.JASPER_0?.value === "PERFECT" &&
                        gems?.AMBER_0?.value === "PERFECT" &&
                        gems?.SAPPHIRE_0?.value === "PERFECT" &&
                        gems?.TOPAZ_0?.value === "PERFECT" &&
                        gems?.AMETHYST_0?.value === "PERFECT")
                        rarity++;
                }
                if (name === 'PULSE_RING') {
                    let charges = talisman?.tag?.value?.ExtraAttributes?.value?.thunder_charge?.value || 0;
                    if (charges >= 150000) rarity++;
                    if (charges >= 1000000) rarity++;
                    if (charges >= 5000000) rarity++;
                }
            }
            if (!(line in talismanObj)) {
                talismanObj[line] = rarity;
            } else if (rarity > talismanObj[line]) {
                talismanObj[line] = rarity;
            }



        });
        let debug = {}

        Object.entries(talismanObj).forEach(([line, rarity]) => {
            let magicPower = 0;
            debug[rarity] = (debug?.[rarity] || 0) + 1
            switch (rarity) {
                case 0:
                    magicPower = 3;
                    break;
                case 1:
                    magicPower = 5;
                    break;
                case 2:
                    magicPower = 8;
                    break;
                case 3:
                    magicPower = 12;
                    break;
                case 4:
                    magicPower = 16;
                    break;
                case 5:
                    magicPower = 22;
                    break;
            }
            if (line === 'HEGE') magicPower *= 2;
            this.value += magicPower;
        });
    }

}

module.exports = MagicPower