const BaseCompletion = require('../baseCompletion');

const races = [
    'chicken',
    'end',
    'woods',
    'crystal_core_anything_no_return',
    'crystal_core_anything_with_return',
    'crystal_core_nothing_no_return',
    'crystal_core_nothing_with_return',
    'crystal_core_no_abilities_no_return',
    'crystal_core_no_abilities_with_return',
    'crystal_core_no_pearls_no_return',
    'crystal_core_no_pearls_with_return',
    'giant_mushroom_anything_no_return',
    'giant_mushroom_anything_with_return',
    'giant_mushroom_nothing_no_return',
    'giant_mushroom_nothing_with_return',
    'giant_mushroom_no_abilities_no_return',
    'giant_mushroom_no_abilities_with_return',
    'giant_mushroom_no_pearls_no_return',
    'giant_mushroom_no_pearls_with_return',
    'precursor_ruins_anything_no_return',
    'precursor_ruins_anything_with_return',
    'precursor_ruins_nothing_no_return',
    'precursor_ruins_nothing_with_return',
    'precursor_ruins_no_abilities_no_return',
    'precursor_ruins_no_abilities_with_return',
    'precursor_ruins_no_pearls_no_return',
    'precursor_ruins_no_pearls_with_return'
]

class Races extends BaseCompletion {

    constructor() {
        super('races', 'Races', 108, -1);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = 0;
        races.forEach(race => {
            for (let i = 1; i <= 4; i++) {
                const key = `complete_the_${race}_race_${i}`
                if (profile?.objectives?.[key]?.status === 'COMPLETE')
                    this.value++
            }
        })
    }

}

module.exports = Races