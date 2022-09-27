const axios = require('axios')

const apiKey = process.env.HYPIXEL_API;

async function getMojangInfo(username) {
    try {
        const response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const name = response.data.name;
        const uuid = response.data.id;
        return { username: name, uuid: uuid }
    } catch (e) {
        console.log('Error requesting mojang info for ' + username);
        console.log(e);
        return null;
    }
}

async function getHypixelPlayer(uuid) {
    try {
        const response = await axios.get(`https://api.hypixel.net/player?uuid=${uuid}&key=${apiKey}`);
        if (!response.data.success) {
            console.log('Error requesting hypixel player info for ' + uuid)
            if (response.data.cause)
                console.log(response.data.cause);
        }
        return response.data;
    } catch (e) {
        console.log('Error requesting hypixel player info for ' + uuid);
        console.log(e);
        return null;
    }
}

async function getHypixelSkyblockProfiles(uuid) {
    try {
        const response = await axios.get(`https://api.hypixel.net/skyblock/profiles?uuid=${uuid}&key=${apiKey}`);
        if (!response.data.success) {
            console.log('Error requesting hypixel skyblock profile info for ' + uuid)
            if (response.data.cause)
                console.log(response.data.cause);
        }
        return response.data;
    } catch (e) {
        console.log('Error requesting hypixel skyblock profile info for ' + uuid);
        console.log(e);
        return null;
    }
}

var achievementResponse;

async function getAchievementData() {
    if (achievementResponse) return achievementResponse;
    try {
        const response = await axios.get(`https://api.hypixel.net/resources/achievements`);
        if (!response.data.success) {
            console.log('Error requesting hypixel achievement data')
            if (response.data.cause)
                console.log(response.data.cause);
        }
        achievementResponse = response.data;
        return achievementResponse;
    } catch (e) {
        console.log('Error requesting hypixel achievement data')
        console.log(e);
        return null;
    }
}

var collectionResponse;

async function getCollectionData() {
    if (collectionResponse) return collectionResponse;
    try {
        const response = await axios.get(`https://api.hypixel.net/resources/skyblock/collections`);
        if (!response.data.success) {
            console.log('Error requesting hypixel collection data')
            if (response.data.cause)
                console.log(response.data.cause);
        }
        collectionResponse = response.data;
        return collectionResponse;
    } catch (e) {
        console.log('Error requesting hypixel collection data')
        console.log(e);
        return null;
    }
}

async function getGuild(uuid, name) {
    try {
        const response = uuid ? await axios.get(`https://api.hypixel.net/guild?player=${uuid}&key=${apiKey}`) : await axios.get(`https://api.hypixel.net/guild?name=${name}&key=${apiKey}`);
        if (!response.data.success) {
            console.log('Error requesting guild for ' + uuid)
            if (response.data.cause)
                console.log(response.data.cause);
        }
        return response.data?.guild;
    } catch (e) {
        console.log('Error requesting guild for' + uuid);
        console.log(e);
        return null;
    }
}

module.exports = {
    getMojangInfo,
    getHypixelPlayer,
    getHypixelSkyblockProfiles,
    getAchievementData,
    getCollectionData,
    getGuild,
}