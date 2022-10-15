const AccessoryBag = require('./accessoryBag');
const { DungeonCompletions, BossCollections, CataXp, ClassXp } = require('./dungeons');
const { Dragons, Arachne, Kuudra } = require('./bosses');
const Bestiary = require('./bestiary');
const Collections = require('./collections');
const Dojo = require('./dojo');
const Quests = require('./quests');
const Museum = require('./museum');
const FairySoul = require('./fairySouls');
const Harp = require('./harp');
const Minions = require('./minions');
const Pets = require('./pets');
const { SlayerKills, SlayerLevels } = require('./slayers');
const { CommissionMilestones, SkillLevels, HeartOfTheMountain } = require('./skills');
const TrophyFish = require('./trophyFish');

module.exports = getCompletions = () => {
    return [
        new SkillLevels(),
        new SlayerLevels(),
        new CataXp(),
        new ClassXp(),
        //museum not in API
        new Museum(),
        new BossCollections(),
        new FairySoul(),

        new Bestiary(),
        //hotm formula not known yet
        new HeartOfTheMountain(),
        new AccessoryBag(),
        new Pets(),
        //quests that contribute not known
        new Quests(),
        new CommissionMilestones(),
        new Collections(),

        new Minions(),
        new Dragons(),
        new SlayerKills(),
        new DungeonCompletions(),
        new Kuudra(),
        new Arachne(),
        //bank upgrades not in API

        new Dojo(),
        new Harp(),
        new TrophyFish()
    ]
}