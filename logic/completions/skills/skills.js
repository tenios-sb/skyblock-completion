const BaseCompletion = require('../baseCompletion');

class Skill extends BaseCompletion {

    constructor(type, max, strandedMax = null, key = null) {
        super(type.toLowerCase(), type + ' XP', max, strandedMax);
        this.key = key || type.toLowerCase();
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.[`experience_skill_${this.key}`] || 0;
    }

}

module.exports = Skill