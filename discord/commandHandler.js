const CompletionCommand = require('./commands/completionCommand');
const ContactCommand = require('./commands/contactsCommand');
const LeaderBoardCommand = require('./commands/leaderboardCommand');


class CommandHandler {

    constructor(db) {
        this.commands = [
            new CompletionCommand(db),
            new LeaderBoardCommand(db),
            new ContactCommand(db),
        ]
    }

    handleChatInputCommand(interaction) {
        const command = this.findCommand(interaction.commandName);
        if (!command) return;
        command.handleCommand(interaction);
    }

    handleAutoComplete(interaction) {
        const command = this.findCommand(interaction.commandName);
        if (!command) return;
        command.handleAutoComplete(interaction);
    }

    findCommand(commandName) {
        for (let command of this.commands) {
            if (command.name === commandName) return command;
        }
        return null;
    }

}

module.exports = CommandHandler