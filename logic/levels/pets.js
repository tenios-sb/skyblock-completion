const BaseLevel = require('./baseLevel');

class PetScore extends BaseLevel {

    constructor() {
        super('pet_score', 'Pet Score', 897);
    }

    getRarityValue(rarity) {
        switch (rarity) {
            case 'MYTHIC': return 6;
            case 'LEGENDARY': return 5;
            case 'EPIC': return 4;
            case 'RARE': return 3;
            case 'UNCOMMON': return 2;
            case 'COMMON': return 1;
            default:
                return 0;
        }
    }

    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        let pets = {};
        profile?.pets?.forEach(pet => {
            let type = pet.type;
            let rarity = pet.tier;
            if (type === 'JERRY' && pet.heldItem === 'PET_ITEM_TOY_JERRY') rarity = 'MYTHIC';
            if (type === 'BAT' && pet.heldItem === 'PET_ITEM_VAMPIRE_FANG') rarity = 'MYTHIC';
            // comment this in once wisp pet stacking is fixed
            //if (type.includes('WISP')) type = 'WISP';
            let value = this.getRarityValue(rarity);
            if (value > (pets?.[type] || 0))
                pets[type] = value;
        })
        this.xp = 3 * Object.values(pets).reduce((prev, val) => prev + val, 0);
    }
}

module.exports = PetScore