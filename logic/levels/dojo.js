const BaseLevel = require('./baseLevel');

class Dojo extends BaseLevel {

    constructor() {
        super('dojo', 'The Dojo', 350);
        this.dojoGames = ['mob_kb', 'wall_jump', 'sword_swap', 'snake', 'archer', 'lock_head', 'fireball'];
        this.ranks = [200, 400, 600, 800, 1000];
    }

    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        this.dojoGames.forEach(game => {
            let score = profile?.nether_island_player_data?.dojo?.[`dojo_points_${game}`];
            this.ranks.forEach(rank => {
                if (score >= rank)
                    this.xp += 10;
            })
        })
    }
}

module.exports = Dojo