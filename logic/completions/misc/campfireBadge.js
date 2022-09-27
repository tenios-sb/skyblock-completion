const BaseCompletion = require('../baseCompletion');

class CampfireBadge extends BaseCompletion {

    constructor() {
        super('campfire_badge', 'Campfire Quest', 30, -1);
    }

    async calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        const talismans = await this.getTalismanContents(profile?.talisman_bag?.data);
        if (!talismans) return;
        talismans.forEach(talisman => {
            const name = talisman?.tag?.value?.ExtraAttributes?.value?.id?.value || 'invalid'
            if (name.includes('CAMPFIRE_TALISMAN')) {
                const level = parseInt(name.split('_').pop()) + 1 || 0;
                if (level > this.value)
                    this.value = level;
            }
        });
    }

}

module.exports = CampfireBadge