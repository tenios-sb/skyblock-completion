const BaseCompletion = require('../baseCompletion');

class PowerStones extends BaseCompletion {

    constructor() {
        super('power_stones', 'Reforge Powers', 16, -1);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.accessory_bag_storage?.unlocked_powers?.length || 0;
    }

}

module.exports = PowerStones