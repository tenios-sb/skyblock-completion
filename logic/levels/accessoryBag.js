const BaseLevel = require('./baseLevel');
const calculateMagicPower = require('../util/magicPower');

class AccessoryBag extends BaseLevel {

    constructor() {
        super('talismans', 'Accessory Bag', 1353);
    }

    async calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = await calculateMagicPower(profile);
    }
}

module.exports = AccessoryBag