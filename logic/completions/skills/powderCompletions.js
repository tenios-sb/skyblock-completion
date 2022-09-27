const BaseCompletion = require('../baseCompletion');

class PowderCommission extends BaseCompletion {

    constructor(type, max) {
        super(type.toLowerCase() + '_commissions', type + ' Powder', max, -1);
        this.type = type.toLowerCase();
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        let powder = 0;
        // if (playerData.mining_core) {
            powder += profile?.mining_core?.[`powder_${this.type}`] || 0;
            powder += profile?.mining_core?.[`powder_spent_${this.type}`] || 0;
        // }
        this.value = powder;
    }

}

module.exports = PowderCommission