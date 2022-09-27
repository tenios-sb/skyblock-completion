const BaseCompletion = require('../baseCompletion');

class DolphinMilestone extends BaseCompletion {

    constructor() {
        super('dolphin_milestone', 'Dolphin Milestones', 10000);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.stats?.pet_milestone_sea_creatures_killed || 0;
    }

}

class RockMilestone extends BaseCompletion {

    constructor() {
        super('rock_milestones', 'Rock Milestones', 250000);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.stats?.pet_milestone_ores_mined || 0;
    }

}

module.exports = {
    DolphinMilestone,
    RockMilestone
}