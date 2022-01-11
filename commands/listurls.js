const { SlashCommandBuilder } = require('@discordjs/builders');
const { getUrls } = require('../backupurls.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listurls')
        .setDescription('List urls that have been added for backup'),
    async execute(interaction, gid) {
        let message = 'Urls added: ';
        let urls = [];
        
        await getUrls(gid)
            .then((res) => {
                urls = res;
            })
            .catch((error) => {
                console.log('Error: ' + error);
                message = 'There was an issue getting the URL list, please try again.';
            }
        );

        if (urls.length > 0) {
            for (let i = 0; i < urls.length; i++) {
                message = message + urls[i] + ", ";
            }
            //remove extra space and comma
            message = message.substring(0, message.length-2);
        } else {
            message = message + 'None';
        }

        await interaction.reply(message);
    },
};