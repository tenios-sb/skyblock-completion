const BaseLevel = require('./baseLevel');

class Museum extends BaseLevel {

    constructor() {
        super('museum', 'Museum Progression', 2196);
    }


    calculateXp(uuid, profileData, playerData) {
        this.xp = this.max;
    }
}

module.exports = Museum