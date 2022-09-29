const nbt = require('prismarine-nbt')

class BaseLevel {

    constructor(id, displayName, max) {
        this.name = displayName;
        this.id = id;
        this.xp = 0;
        this.max = max;
    }

    getProfile(uuid, profileData) {
        return profileData.members[uuid];
    }

    calculateXp(uuid, profileData, playerData) {

    }

    async getTalismanContents(data) {
        if (!data) return;
        return this.getInventoryContents(data)
    }

    async getInventoryContents(base64) {
        const buffer = Buffer.from(base64, "base64");
        const data = await nbt.parse(buffer);
        return data?.parsed?.value?.i?.value?.value;
    }

}

module.exports = BaseLevel