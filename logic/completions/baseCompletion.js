const nbt = require('prismarine-nbt')

class BaseCompletion {

    constructor(id, displayName, max, strandedMax = null) {
        this.name = displayName;
        this.id = id;
        this.value = 0;
        this.max = max;
        this.strandedMax = strandedMax || max;
    }

    getCompletion(stranded) {
        let result = 0;
        if (stranded) {
            result = this.value / this.strandedMax
        } else {
            result = this.value / this.max
        }
        result = Math.min(1, result);
        result = Math.max(0, result);
        return result;
    }

    isAvailableOnStranded() {
        return this.strandedMax === -1;
    }

    getProfile(uuid, profileData) {
        return profileData.members[uuid];
    }

    calculateCompletion(uuid, profileData, playerData) {

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

    toJsonObject(stranded) {
        return {
            value: this.value,
            completion: this.getCompletion(stranded)
        }
    }

}

module.exports = BaseCompletion