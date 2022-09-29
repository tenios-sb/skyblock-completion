const AccessoryBag = require('./accessoryBag');
const { DungeonCompletions, BossCollections, CataXp, ClassXp } = require('./dungeons');
const { Dragons, Arachne, Kuudra } = require('./bosses');
const Bestiary = require('./bestiary');
const Collections = require('./collections');
const Dojo = require('./dojo');
const FairySoul = require('./fairySouls');
const Harp = require('./harp');
const Minions = require('./minions');
const Pets = require('./pets');
const { SlayerKills, SlayerLevels } = require('./slayers');
const { CommissionMilestones, SkillLevels } = require('./skills');
const TrophyFish = require('./trophyFish');

module.exports = getCompletions = () => {
    return [
        new AccessoryBag(),
        new Bestiary(),
        new Arachne(),
        new Kuudra(),
        new Dragons(),
        new Collections(),
        new Dojo(),
        new CataXp(),
        new ClassXp(),
        new BossCollections(),
        new DungeonCompletions(),
        new FairySoul(),
        new Harp(),
        new Minions(),
        new Pets(),
        new SkillLevels(),
        new CommissionMilestones(),
        new SlayerLevels(),
        new SlayerKills(),
        new TrophyFish()
    ]
}