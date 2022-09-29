const BaseLevel = require('./baseLevel');

class TrophyFish extends BaseLevel {

    constructor() {
        super('trophy_fish', 'Trophy Fish', 1080);
        this.bronzeXp = 4;
        this.silverXp = 8;
        this.goldXp = 16;
        this.diamondXp = 32;
    }


    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        Object.keys(profile?.trophy_fish || {}).forEach(fish => {
            if (fish.endsWith('bronze'))
                this.xp += this.bronzeXp;
            else if (fish.endsWith('silver'))
                this.xp += this.silverXp;
            else if (fish.endsWith('gold'))
                this.xp += this.goldXp;
            else if (fish.endsWith('diamond'))
                this.xp += this.diamondXp;

        })
    }
}

module.exports = TrophyFish