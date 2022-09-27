const BaseCompletion = require('../baseCompletion');

class Harp extends BaseCompletion {

    constructor() {
        super('harp', 'Harp', 13);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = 0;
        Object.entries(profile?.harp_quest || {}).forEach(([song, score]) => {
            if (song.includes('best_completion')) {
                this.value += score;
            }
        })
    }

}

module.exports = Harp