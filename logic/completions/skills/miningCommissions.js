const BaseCompletion = require('../baseCompletion');

class MiningCommissions extends BaseCompletion {

    constructor() {
        super('mining_commissions', 'Mining Commissions', 750, -1);
    }

    calculateCompletion(uuid, profileData, playerData) {
        this.value = playerData?.achievements?.skyblock_hard_working_miner || 0;
    }

}

module.exports = MiningCommissions