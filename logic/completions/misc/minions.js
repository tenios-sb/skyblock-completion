const BaseCompletion = require('../baseCompletion');

class Minions extends BaseCompletion {

    constructor() {
        super('minions', 'Minions', 673, 595);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const craftedMinions = new Set();
        Object.values(profileData?.members || {}).forEach(member => {
            member?.crafted_generators?.forEach(minion => craftedMinions.add(minion));
        })
        this.value = craftedMinions.size;
    }

}

module.exports = Minions