const BaseCompletion = require('../baseCompletion');
const calculateMagicPower = require('../../util/magicPower');

class MagicPower extends BaseCompletion {

    constructor() {
        super('magic_power', 'Magic Power', 1279, -1);
    }

    async calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = await calculateMagicPower(profile);
    }

}

module.exports = MagicPower