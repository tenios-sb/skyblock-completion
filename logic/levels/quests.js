const BaseLevel = require('./baseLevel');

class Quests extends BaseLevel {

    constructor() {
        super('quests', 'Complete Quests', 105);
    }


    calculateXp(uuid, profileData, playerData) {
        this.xp = 105;
    }
}

module.exports = Quests