require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const discordToken = process.env.DISCORD_TOKEN;
const discordClientId = process.env.DISCORD_CLIENT_ID;
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(discordToken);

(async () => {
    try {
        await rest.put(Routes.applicationCommands(discordClientId), { body: commands }, 0);
        console.log('Slash commands loaded');
    } catch(error) {
        console.error(error);
    }
})();