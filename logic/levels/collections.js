const BaseLevel = require('./baseLevel');
const { getCollectionData } = require('../util/apiRequests');

const maxCollections = {}
getCollectionData().then(data => {
    Object.values(data?.collections || {}).forEach(category => {
        Object.entries(category?.items || {}).forEach(([name, collection]) => {
            maxCollections[name] = []
            collection?.tiers?.forEach(tier => {
                maxCollections[name].push(tier.amountRequired);
            })
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
        const collections = {};
        Object.values(profileData?.members || {}).forEach(member => {
            Object.entries(member?.collection || {}).forEach(([collection, amount]) => {
                collections[collection] = (collections[collection] || 0) + (amount < 0 ? 2147483647 : amount);
            });

            member?.unlocked_coll_tiers?.forEach(col => {
                let parts = col.split('_');
                let tier = parts.pop();
                let collection = parts.join('_');
                if (tier > 0 && tier <= maxCollections[collection].length)
                    highestUnlocks[collection] = Math.max(highestUnlocks?.[collection] || 0, tier);
            });
        });
        Object.entries(maxCollections).forEach(([col, tiers]) => {
            let unlocked = 0;
            if (col in collections) {
                tiers.forEach(tier => {
                    if (tier <= collections[col])
                        unlocked++;
                })
            }
            highestUnlocks[col] = Math.max(highestUnlocks?.[col] || 0, unlocked);
        })

        this.xp = Object.values(highestUnlocks).reduce((prev, val) => prev + val, 0) * 4;
    }
}

module.exports = Collections