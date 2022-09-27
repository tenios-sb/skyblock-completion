const BaseCompletion = require('../baseCompletion');
const { getAchievementData } = require('../../util/apiRequests')

class TieredAchievements extends BaseCompletion {

    constructor() {
        super('achievements_tiered', 'Tiered Achievements', -1, -1);
    }

    async calculateCompletion(uuid, profileData, playerData) {
        const achivementData = await getAchievementData();
        const achievementReqs = {};
        this.max = 0;
        Object.entries(achivementData?.achievements?.skyblock?.tiered || {}).forEach(([key, achievement]) => {
            achievement?.tiers?.forEach(tier => {
                if (tier?.tier === 5) {
                    achievementReqs['skyblock_' + (key.toLowerCase() || 'invalid')] = tier.amount;
                    this.max++;
                }
            });
        })
        this.value = 0;
        Object.keys(playerData?.achievements || {}).forEach(key => {
            if (key in achievementReqs && playerData?.achievements?.[key] >= achievementReqs?.[key]) {
                this.value++;
            }
        })
    }

}

class OneTimeAchievements extends BaseCompletion {

    constructor() {
        super('achievements_once', 'One Time Achievements', -1, -1);
    }

    async calculateCompletion(uuid, profileData, playerData) {
        const achivementData = await getAchievementData();
        this.max = Object.values(achivementData?.achievements?.skyblock?.one_time || {}).length;

        this.value = 0;
        playerData?.achievementsOneTime?.forEach(achievement => {
            if (achievement instanceof Array) return;
            if (achievement.startsWith('skyblock')) {
                this.value++;
            }
        })
    }

}

module.exports = {
    TieredAchievements,
    OneTimeAchievements
}