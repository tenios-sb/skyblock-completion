const BaseCompletion = require('../baseCompletion');

const mythicPets = ['JERRY', 'FLYING_FISH', 'BAT', 'RAT', 'ENDERMAN', 'ENDERMITE'];

class Pets extends BaseCompletion {

    constructor() {
        super('pets', 'Pets', 59, -1);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = 0;
        let pets = {};
        profile?.pets?.forEach(pet => {
            let type = pet.type;
            let rarity = pet.tier;
            if (type === 'JERRY' && pet.heldItem === 'PET_ITEM_TOY_JERRY') rarity = 'MYTHIC';
            if (type === 'BAT' && pet.heldItem === 'PET_ITEM_VAMPIRE_FANG') rarity = 'MYTHIC';
            if (type.includes('WISP')) type = 'WISP';
            let value = Math.min(1, pet.exp / this.getMaxXp(type)) * this.getRarityDebuff(rarity, type);
            if (value > (pets?.[type] || 0))
                pets[type] = value;
        })
        this.value = Object.values(pets).reduce((prev, val) => prev + val, 0);
    }

    getRarityDebuff(rarity, pet) {
        if (pet === 'KUUDRA') {
            switch (rarity) {
                case 'COMMON':
                    return 0.25;
                case 'UNCOMMON':
                    return 0.5;
                case 'RARE':
                    return 0.75
                default:
                    return 1;
            }
        }
        if (mythicPets.includes(pet)) {
            switch (rarity) {
                case 'COMMON': return 0.2;
                case 'UNCOMMON': return 0.4;
                case 'RARE': return 0.6;
                case 'EPIC': return 0.8;
                case 'LEGENDARY': return 0.9;
                default: return 1;
            }
        }
        switch (rarity) {
            case 'COMMON': return 0.2;
            case 'UNCOMMON': return 0.4;
            case 'RARE': return 0.6;
            case 'EPIC': return 0.8;
            default: return 1;
        }
    }

    getMaxXp(pet) {
        if (pet === 'GOLDEN_DRAGON')
            return 210255386;
        if (pet === 'KUUDRA')
            return 18608500
        return 25353230
    }

}

module.exports = Pets