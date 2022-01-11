const { SlashCommandBuilder } = require('@discordjs/builders');
const { addUrl } = require('../backupurls.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addurl')
        .setDescription('Backup photos with links containing entered URL')
        .addStringOption(option => option.setName('url').setDescription('Enter base URL where images are hosted that you want backed up').setRequired(true)),
    async execute(interaction, gid) {
        const urlOption = await interaction.options.getString('url');

        addUrl(urlOption, gid)
            .then(()=>{
                console.log('Added url: ' + urlOption);
                interaction.reply('Added URL: ' + urlOption);
            })
            .catch((error) => {
                console.log('Error: ' + error);
                interaction.reply('There was an issue adding the URL, please try again.');
            }
        );
    },
};