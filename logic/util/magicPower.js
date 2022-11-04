const nbt = require('prismarine-nbt')
const { taliData } = require('./constants')

async function calculateMagicPower(profile) {
    const talismans = await getTalismanContents(profile?.talisman_bag?.data);
    let value = 0;
    let talismanObj = {};
    if (!talismans) return 0;
    talismans.forEach(talisman => {
        const name = talisman?.tag?.value?.ExtraAttributes?.value?.id?.value || 'invalid'
        if (name === 'invalid') return;
        var rarity = 0;
        var line = 'invalid';
        if (name.includes('CAMPFIRE_TALISMAN')) {
            const level = parseInt(name.split('_').pop()) + 1 || 0;
            if (level > 4) rarity++;
            if (level > 8) rarity++;
            if (level > 13) rarity++;
            if (level > 21) rarity++;
            if (talisman?.tag?.value?.ExtraAttributes?.value?.rarity_upgrades?.value === 1)
                rarity++;
            line = 'CAMPFIRE';
        } else if (name === 'PANDORAS_BOX') {
            switch (talisman?.tag?.value?.ExtraAttributes?.value?.['pandora-rarity']?.value || 'COMMON') {
                case "COMMON":
                    rarity = 0;
                    break;
                case "UNCOMMON":
                    rarity = 1;
                    break;
                case "RARE":
                    rarity = 2;
                    break;
                case "EPIC":
                    rarity = 3;
                    break;
                case "LEGENDARY":
                    rarity = 4;
                    break;
                case "MYTHIC":
                    rarity = 5;
                    break;
            };
            line = 'PANDORA';
        } else {
            if (!(name in taliData)) {
                console.log('Found unknown talisman: ' + name);
                return;
            }
            rarity = taliData[name].rarity;
            line = taliData[name].line;
            //check for recombs
            if (talisman?.tag?.value?.ExtraAttributes?.value?.rarity_upgrades?.value === 1 && line !== 'CRAB')
                rarity++;
            if (name === 'POWER_ARTIFACT') {
                let gems = talisman?.tag?.value?.ExtraAttributes?.value?.gems?.value;
                if (gems?.RUBY_0?.value === "PERFECT" &&
                    gems?.JADE_0?.value === "PERFECT" &&
                    gems?.JASPER_0?.value === "PERFECT" &&
                    gems?.AMBER_0?.value === "PERFECT" &&
                    gems?.SAPPHIRE_0?.value === "PERFECT" &&
                    gems?.TOPAZ_0?.value === "PERFECT" &&
                    gems?.AMETHYST_0?.value === "PERFECT")
                    rarity++;
            }
            if (name === 'PULSE_RING') {
                let charges = talisman?.tag?.value?.ExtraAttributes?.value?.thunder_charge?.value || 0;
                if (charges >= 150000) rarity++;
                if (charges >= 1000000) rarity++;
                if (charges >= 5000000) rarity++;
            }
        }
        if (!(line in talismanObj)) {
            talismanObj[line] = rarity;
        } else if (rarity > talismanObj[line]) {
            talismanObj[line] = rarity;
        }



    });

    Object.entries(talismanObj).forEach(([line, rarity]) => {
        let magicPower = 0;
        switch (rarity) {
            case 0:
                magicPower = 3;
                break;
            case 1:
                magicPower = 5;
                break;
            case 2:
                magicPower = 8;
                break;
            case 3:
                magicPower = 12;
                break;
            case 4:
                magicPower = 16;
                break;
            case 5:
                magicPower = 22;
                break;
        }
        if (line === 'HEGE') magicPower *= 2;
        value += magicPower;
        if (line === 'ABICASE') {
            value += ~~(profile?.nether_island_player_data?.abiphone?.active_contacts?.length / 2) || 0;
        }
    });
    return value;
}


async function getTalismanContents(data) {
    if (!data) return;
    return getInventoryContents(data)
}

async function getInventoryContents(base64) {
    const buffer = Buffer.from(base64, "base64");
    const data = await nbt.parse(buffer);
    return data?.parsed?.value?.i?.value?.value;
}


module.exports = calculateMagicPower;