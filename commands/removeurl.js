const { SlashCommandBuilder } = require('@discordjs/builders');
const { removeUrl } = require('../backupurls.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeurl')
        .setDescription('Remove URL from image backup')
        .addStringOption(option => option.setName('url').setDescription('Enter URL to remove').setRequired(true)),
    async execute(interaction) {
        const urlOption = interaction.options.getString('url');
        await removeUrl(urlOption).then(() => {
            console.log('Removed url: ' + urlOption);
            interaction.reply('URL removed: ' + urlOption);
        }).catch((error) => {
            console.log('URL not found: ' + urlOption);
            interaction.reply('Error: ' + error);
        });
    },
};