const BaseCompletion = require('../baseCompletion');
const { essenceCosts } = require('../../util/constants');


class EssenceShop extends BaseCompletion {

    constructor(type, max) {
        super(type.toLowerCase() + '_essence_shop', type + ' Essence Shop', max, -1);
        this.type = type.toLowerCase();
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = 0;
        for (const [perk, tier] of Object.entries(profile?.perks || {})) {
            if (perk in essenceCosts[this.type])
                this.value += essenceCosts[this.type][perk][tier]
        }
        this.value += profile?.[`essence_${this.type}`] || 0;
    }

}

module.exports = EssenceShop