const BaseLevel = require('./baseLevel');
const { getCollectionData } = require('../util/apiRequests');

const maxCollections = {}
getCollectionData().then(data => {
    Object.values(data?.collections || {}).forEach(category => {
        Object.entries(category?.items || {}).forEach(([name, collection]) => {
            maxCollections[name] = collection?.maxTiers || 0;
        })
    })
});

class Collections extends BaseLevel {

    constructor() {
        super('collections', 'Collections', 2448);
    }


    calculateXp(uuid, profileData, playerData) {
        this.xp = 0;
        const highestUnlocks = {};
        Object.values(profileData?.members || {}).forEach(member => {
            member?.unlocked_coll_tiers?.forEach(col => {
                let parts = col.split('_');
                let tier = parts.pop();
                let collection = parts.join('_');
                if (tier > 0 && tier <= maxCollections[collection])
                    highestUnlocks[collection] = Math.max(highestUnlocks?.[collection] || 0, tier);
            });
        })

        this.xp = Object.values(highestUnlocks).reduce((prev, val) => prev + val, 0) * 4;
    }
}

module.exports = Collections