const { SlashCommandBuilder } = require('@discordjs/builders');
const { addUrl } = require('../backupurls.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addurl')
        .setDescription('Backup photos with links containing entered URL')
        .addStringOption(option => option.setName('url').setDescription('Enter base URL where images are hosted that you want backed up').setRequired(true)),
    async execute(interaction) {
        const urlOption = interaction.options.getString('url');
        addUrl(urlOption);
        console.log('Added url: ' + urlOption);
        await interaction.reply('URL added');
    },
};