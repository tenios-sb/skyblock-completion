const BaseCompletion = require('../baseCompletion');
const { getCollectionData } = require('../../util/apiRequests')

class Collections extends BaseCompletion {

    constructor() {
        2147483647
        super('collections', 'Collections', -1, -1);
    }

    async calculateCompletion(uuid, profileData, playerData) {
        const collectionData = await getCollectionData();
        const collectionReqs = {};
        Object.values(collectionData?.collections || {}).forEach(category => {
            Object.entries(category?.items || {}).forEach(([name, item]) => {
                let tiers = item?.tiers || [{ amountRequired: 1 }];
                collectionReqs[name] = {
                    collection: 0,
                    max: tiers[tiers.length - 1]?.amountRequired || 1
                };
            })
        });
        this.max = Object.keys(collectionReqs).length;
        this.value = 0;
        Object.values(profileData?.members || {}).forEach(member => {
            Object.entries(member?.collection || {}).forEach(([name, amount]) => {
                //deathstreeks specific fix
                let correctedAmount = amount < 0 ? 2147483647 : amount;
                if (name in collectionReqs)
                    collectionReqs[name].collection += correctedAmount;
            });
        });
        Object.values(collectionReqs).forEach(collection => {
            this.value += Math.min(1, collection.collection / collection.max);
        })
    }

}

module.exports = Collections