const Hotm = require('./skills/hotm');
const MiningCommissions = require('./skills/miningCommissions');
const PowderCommission = require('./skills/powderCompletions');
const { FarmingFortuneShop, FarmingCap } = require('./skills/jacobShop');
const TropyhFish = require('./skills/trophyFish');
const { Skill, Social } = require('./skills/skills');
const BossCollection = require('./dungeons/bossCollections');
const Catacombs = require('./dungeons/catacombs');
const DungeonClass = require('./dungeons/dungeonClasses');
const EssenceShop = require('./dungeons/essenceShop');
const DungeonJournals = require('./dungeons/dungeonJournals');
const AbiphoneContacts = require('./misc/abiphoneContacts');
const { OneTimeAchievements, TieredAchievements } = require('./misc/achievements');
const { DolphinMilestone, RockMilestone } = require('./misc/petMilestones');
const Pets = require('./misc/pets');
const CampfireBadge = require('./misc/campfireBadge');
const DianaKills = require('./misc/dianaKills');
const FairySouls = require('./misc/fairySouls');
const PersonalBank = require('./misc/personalBank');
const PowerStones = require('./misc/powerStones');
const Races = require('./misc/races');
const ReaperPepper = require('./misc/reaperPeppers');
const Slayer = require('./misc/slayers');
const Dojo = require('./misc/dojo');
const Minions = require('./misc/minions');
const Harp = require('./misc/harp');
const MagicPower = require('./misc/magicPower');
const Collections = require('./misc/collections');

module.exports = getCompletions = () => {
    return [
        new Slayer('Zombie'),
        new Slayer('Spider'),
        new Slayer('Wolf'),
        new Slayer('Enderman'),
        new Slayer('Blaze'),
        //achievements
        new OneTimeAchievements(),
        new TieredAchievements(),
        //misc
        new DianaKills(),
        new FairySouls(),
        new PersonalBank(),
        new PowerStones(),
        new Races(),
        new ReaperPepper(),
        new AbiphoneContacts(),
        new Harp(),
        new Minions(),
        new Collections(),
        //tali
        new CampfireBadge(),
        new MagicPower(),
        //pets
        new RockMilestone(),
        new DolphinMilestone(),
        new Pets(),

        //dojo
        new Dojo('Force', 'mob_kb'),
        new Dojo('Stamina', 'wall_jump'),
        new Dojo('Mastery', 'archer'),
        new Dojo('Discipline', 'sword_swap'),
        new Dojo('Swiftness', 'snake'),
        new Dojo('Control', 'lock_head'),
        new Dojo('Tenacity', 'fireball'),

        // farming
        new FarmingCap(),
        new FarmingFortuneShop(),
        // mining
        new Hotm(),
        new MiningCommissions(),
        new PowderCommission('Gemstone', 23540045),
        new PowderCommission('Mithril', 15425203),
        //trophy fish
        new TropyhFish(['Bronze', 'silver', 'gold', 'diamond']),
        new TropyhFish(['Silver', 'gold', 'diamond']),
        new TropyhFish(['Gold', 'diamond']),
        new TropyhFish(['Diamond']),
        //skills
        new Skill('Enchanting', 111672425),
        new Skill('Alchemy', 55172425),
        new Skill('Mining', 111672425),
        new Skill('Taming', 55172425),
        new Skill('Fishing', 55172425),
        new Skill('Farming', 111672425),
        new Skill('Combat', 111672425),
        new Skill('Foraging', 55172425),
        new Skill('Carpentry', 55172425),
        new Skill('Runecrafting', 94450, -1),
        new Social(),

        //boss collections
        new BossCollection("1"),
        new BossCollection("2"),
        new BossCollection("3"),
        new BossCollection("4"),
        new BossCollection("5"),
        new BossCollection("6"),
        new BossCollection("7"),
        //dungeons
        new Catacombs(),
        new DungeonJournals(),
        //essence
        new EssenceShop('Undead', 539500),
        new EssenceShop('Wither', 24550),
        new EssenceShop('Dragon', 51275),
        new EssenceShop('Spider', 32725),
        new EssenceShop('Ice', 59100),
        //classes
        new DungeonClass('Archer'),
        new DungeonClass('Mage'),
        new DungeonClass('Healer'),
        new DungeonClass('Tank'),
        new DungeonClass('Berserk')
    ]
}