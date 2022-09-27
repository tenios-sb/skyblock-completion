const BaseCompletion = require('../baseCompletion');

class PersonalBank extends BaseCompletion {

    constructor() {
        super('personal_bank', 'Personal Bank', 3, -1);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.personal_bank_upgrade || 0;
    }

}

module.exports = PersonalBank