const BaseCompletion = require('../baseCompletion');

class TropyhFish extends BaseCompletion {

    constructor(tiers) {
        super(tiers[0] + '_trophy_fish', tiers[0] + ' Trophy Fish', 18, -1);
        this.tiers = tiers.map(t => t.toLowerCase());
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        let uniqueTrophies = new Set();
        Object.keys(profile?.trophy_fish || {}).forEach(key => {
            const parts = key.split('_');
            const rarity = parts.pop();
            const fish = parts.join('_');
            if (this.tiers.includes(rarity))
                uniqueTrophies.add(fish)
        })
        this.value = uniqueTrophies.size;
    }

}

module.exports = TropyhFish