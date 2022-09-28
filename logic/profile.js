const getCompletions = require('./completions/completionList');

class Profile {

    constructor(uuid, profileData, playerData) {
        this.completions = getCompletions();
        this.uuid = uuid;
        this.profileData = profileData;
        this.playerData = playerData;
        this.mode = profileData?.game_mode || 'default';
        this.name = profileData?.cute_name || 'sb-comp-invalid-profile';
        this.selected = profileData?.selected || false;
    }

    async calculateCompletion() {
        await Promise.all([...this.completions.map(completion => completion.calculateCompletion(this.uuid, this.profileData, this.playerData))]);
    }

    getOverallCompletion() {
        const stranded = this.mode === 'island';
        let sum = 0;
        let count = 0;
        this.completions.forEach(completion => {
            if (!stranded || completion.strandedMax !== -1) {
                sum += completion.getCompletion(stranded);
                count++;
            }
        })
        return sum / count;
    }

    toJsonObject() {
        let object = {};
        object.mode = this.mode;
        object.name = this.name;
        object.lastPlayed = this.lastPlayed;
        object.completion = this.getOverallCompletion();
        object.completions = {}
        this.completions.forEach(comp => object.completions[comp.id] = comp.toJsonObject(this.mode === 'island'));
        return object;
    }

}

module.exports = Profile