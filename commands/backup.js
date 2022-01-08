const { SlashCommandBuilder } = require('@discordjs/builders');
const { uploadImage } = require('../lib/imgur');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('backup')
        .setDescription('Perform one-time backup on specific photo')
        .addStringOption(option => option.setName('url').setDescription('Image URL').setRequired(true)),
    async execute(interaction) {
        const urlOption = interaction.options.getString('url');

        await uploadImage(urlOption).then((res) => {
            interaction.reply(res);
        }).catch((error) => {
            console.log('Error: ' + error);
            return;
        });
    },
};