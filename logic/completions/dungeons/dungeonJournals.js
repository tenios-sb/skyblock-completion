const BaseCompletion = require('../baseCompletion');

class DungeonJournals extends BaseCompletion {

    constructor() {
        super('dungeon_journals', 'Dungeon Journals', 200, -1);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = Object.values(profile?.dungeons?.dungeon_journal?.journal_entries || {}).reduce((prev, arr) => prev + arr.length, 0) || 0;
    }

}

module.exports = DungeonJournals