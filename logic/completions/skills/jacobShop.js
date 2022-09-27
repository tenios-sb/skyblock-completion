const BaseCompletion = require('../baseCompletion');
const extraFarmingDrops = {
    0: 0, 1: 1, 2: 2, 3: 3, 4: 5, 5: 7, 6: 10, 7: 13, 8: 17, 9: 21, 10: 26, 11: 32, 12: 39, 13: 47, 14: 56, 15: 66
}

class FarmingFortuneShop extends BaseCompletion {

    constructor() {
        super('farming_fortune_jacob', 'Farming Fortune', 66);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = extraFarmingDrops?.[profile?.jacob2?.perks?.double_drops || 0] || 0;
        this.value += profile?.jacob2?.medals_inv?.gold || 0
    }

}

class FarmingCap extends BaseCompletion {

    constructor() {
        super('farming_cap', 'Farming Level Cap', 10);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.jacob2?.perks?.farming_level_cap || 0;
    }

}

module.exports = {
    FarmingCap,
    FarmingFortuneShop
}