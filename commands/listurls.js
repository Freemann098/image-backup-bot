const { SlashCommandBuilder } = require('@discordjs/builders');
const { getUrls } = require('../backupurls.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listurls')
        .setDescription('List urls that have been added for backup'),
    async execute(interaction) {
        let message = 'Urls added: ';
        
        if (getUrls().length > 0) {
            for (let i = 0; i < getUrls().length; i++) {
                message = message + getUrls()[i] + ", ";
            }
            //remove extra space and comma
            message = message.substring(0, message.length-2);
        } else {
            message = message + 'None';
        }

        await interaction.reply(message);
    },
};