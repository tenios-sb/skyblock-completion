const BaseLevel = require('./baseLevel');

class CommissionMilestones extends BaseLevel {

    constructor() {
        super('commission_milestones', 'Commission Milestones', 255);
        this.milestones = {
            commission_milestone_reward_skyblock_xp_tier_1: 20,
            commission_milestone_reward_skyblock_xp_tier_2: 30,
            commission_milestone_reward_skyblock_xp_tier_3: 30,
            commission_milestone_reward_skyblock_xp_tier_4: 50,
            commission_milestone_reward_skyblock_xp_tier_5: 50,
            commission_milestone_reward_skyblock_xp_tier_6: 75,
        }
    }


    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        Object.keys(this.milestones).forEach(milestone => {
            if ((profile?.tutorial || []).includes(milestone))
                this.xp += this.milestones[milestone];
        });
    }
}

class SkillLevels extends BaseLevel {

    constructor() {
        super('skill_levels', 'Skill Level Up', 7500);

        this.cummulativeXp = [
            50, 175, 375, 675, 1175, 1925, 2925, 4425, 6425, 9925, 14925, 22425, 32425, 47425, 67425, 97425, 147425, 222425, 322425, 522425, 822425,
            1222425, 1722425, 2322425, 3022425, 3822425, 4722425, 5722425, 6822425, 8022425, 9322425, 10722425, 12222425, 13822425, 15522425, 17322425,
            19222425, 21222425, 23322425, 25522425, 27822425, 30222425, 32722425, 35322425, 38072425, 40972425, 44072425, 47472425, 51172425, 55172425,
            59472425, 64072425, 68972425, 74172425, 79672425, 85472425, 91572425, 97972425, 104672425, 111672425,
        ];
        this.skills = {
            carpentry: 50,
            fishing: 50,
            alchemy: 50,
            taming: 50,
            foraging: 50,
            combat: 60,
            enchanting: 60,
            mining: 60,
            farming: 60
        }
    }

    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.xp = 0;
        Object.keys(this.skills).forEach(skill => {
            let skillXp = profile?.[`experience_skill_${skill}`] || 0;
            let level = 0;
            for (; level < this.skills[skill]; level++) {
                if (skillXp < this.cummulativeXp[level])
                    break;
            }
            if (skill === 'farming')
                level = Math.min(level, 50 + (profile?.jacob2?.unique_golds2?.length || 0))

            for (; level > 0; level--) {
                if (level > 50)
                    this.xp += 30;
                else if (level > 25)
                    this.xp += 20;
                else if (level > 10)
                    this.xp += 10;
                else
                    this.xp += 5;
            }
        })
    }
}

class HeartOfTheMountain extends BaseLevel {

    constructor() {
        super('hotm', 'Heart of the Mountain', 1495);

        this.cummulativeXp = [0, 3000, 12000, 37000, 97000, 197000, 347000];
        this.hotmRewards = [35, 45, 60, 75, 90, 110, 130]
    }

    calculateXp(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        let hotmXp = profile?.mining_core?.experience || 0;
        let mithril = Math.min((profile?.mining_core?.[`powder_mithril`] || 0) + (profile?.mining_core?.[`powder_spent_mithril`] || 0), 12500000);
        let gemstone = Math.min((profile?.mining_core?.[`powder_gemstone`] || 0) + (profile?.mining_core?.[`powder_spent_gemstone`] || 0), 20000000);
        let hotmLevel = this.cummulativeXp.filter(x => x <= hotmXp).length;
        this.xp = 0;
        //note: -1 since hotm xp bugged rn and the highest level doesnt seem to give xp
        for (let i = 0; i < hotmLevel - 1; i++) {
            this.xp += this.hotmRewards[i];
        }
        let mithrilUnder = Math.min(350000, mithril);
        let mithrilOver = Math.max(0, mithril - 350000);
        let gemstoneUnder = Math.min(350000, gemstone);
        let gemstoneOver = Math.max(0, gemstone - 350000);
        this.xp += ~~(mithrilUnder / 2400);
        this.xp += ~~(gemstoneUnder / 2500);
        this.xp += mithrilOver ? ~~(3.75 * (Math.sqrt(1 + 8 * (Math.sqrt((1758267 / 12500000) * mithrilOver + 9))) - 3)) : 0
        this.xp += gemstoneOver ? ~~(4.25 * (Math.sqrt(1 + 8 * (Math.sqrt((1758267 / 20000000) * gemstoneOver + 9))) - 3)) : 0
    }
}

module.exports = { CommissionMilestones, SkillLevels, HeartOfTheMountain }