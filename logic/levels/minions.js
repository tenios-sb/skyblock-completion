const BaseLevel = require('./baseLevel');

class Minions extends BaseLevel {

    constructor() {
        super('minions', 'Craft Minions', 2754);
        this.xpTable = {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 2,
            8: 3,
            9: 4,
            10: 6,
            11: 12,
            12: 24
        }
    }


    calculateXp(uuid, profileData, playerData) {
        this.xp = 0;
        const craftedMinions = new Set();
        Object.values(profileData?.members || {}).forEach(member => {
            member?.crafted_generators?.forEach(minion => craftedMinions.add(minion));
        })
        craftedMinions.forEach(minion => {
            if (minion === 'COBBLESTONE_1') return;
            let tier = minion.split('_').pop();
            this.xp += this.xpTable[tier];
        })
    }
}

module.exports = Minions