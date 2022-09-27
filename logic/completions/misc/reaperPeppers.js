const BaseCompletion = require('../baseCompletion');

class ReaperPeppers extends BaseCompletion {

    constructor() {
        super('reaper_peppers', 'Reaper Peppers', 5, -1);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.reaper_peppers_eaten || 0;
    }

}

module.exports = ReaperPeppers