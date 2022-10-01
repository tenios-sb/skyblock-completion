class BaseCommand {

    constructor(name) {
        this.name = name;
    }

    handleCommand(interaction) {

    }

    handleAutoComplete(interaction) {

    }

    formatPercentage(number, decimals = 4) {
        let cutoff = parseInt(number * 100 * 10 ** decimals);
        let percent = cutoff / 10 ** decimals;
        return `${percent}%`;
    }

    formatNumber(number) {
        var n = parseInt(number * 100) / 100;
        var parts = n.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    getProfileEmoji(mode) {
        if (mode == 'bingo')
            return ' 🎲'
        if (mode == 'island')
            return ' 🌴'
        if (mode == 'ironman')
            return ' ♻️'
        return ''
    }

    showErrorMessage(interaction, error) {
        interaction.editReply({
            embeds: [{
                title: `Error`,
                description: error,
                color: 0xf04a4a,
                footer: {
                    text: 'Made by tenios#7042'
                }
            }]
        })
    }
}

module.exports = BaseCommand