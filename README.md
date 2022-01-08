# Image Backup Bot

<table>
<tr>
<td>
  Discord bot that automatically backs up image/video links to Imgur based on base URLs provided for the bot to look for. The purpose of this Discord bot would be to back up image or video links that are posted that may not be retained by their host because of post expiration or deletion. Works with all Imgur supported formats which includes all standard image formats and the following video formats
</td>
</tr>
</table>

![](https://i.imgur.com/Bkp8D1D.png)

## Installing

To clone and run this bot application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) 

In the command line:

```bash
# Clone repository
$ git clone https://github.com/Freemann098/image-backup-bot

# Navigate to the repository directory
$ cd image-backup-bot

# Install dependencies
$ npm install

# Set environment variables in a .env file as described below
# Run the app
$ npm start
```

### Environment Variables

This project uses [dotenv](https://www.npmjs.com/package/dotenv) for the environment variables. The following environment variables will need to be set in a .env file in order for the bot to run properly.

- `DISCORD_CLIENT_ID` - Your [Discord API](https://discord.com/developers/applications) application client ID
- `DISCORD_TOKEN` - Your [Discord API](https://discord.com/developers/applications) bot token
- `IMGUR_CLIENT_ID` - Your [Imgur API](https://api.imgur.com/oauth2/addclient) application client ID

### Slash Commands
This bot uses Discord's slash commands for executing bot commands. After environment variables are set, you will need to run 
`node deploy-commands.js` to load the slash commands. This will have to be done everytime you add/edit slash commands. Per the Discord API, global slash commands can take up to an hour to update.

## Usage

Once the node app is running, you will need to invite the bot to your Discord server using the following link, replace `client_id` with your bot's client ID.

`https://discord.com/api/oauth2/authorize?client_id=1234567890&permissions=2147568640&scope=bot%20applications.commands`

When this bot is running on a Discord server, it comes with 4 slash commands

- `/addurl URL` - Adds URL to check for to backup images from that site. Example - `/addurl i.redd.it` will make sure any image link posted from Reddit in the Discord server will be backed up to Imgur
- `/removeurl URL` - Removes URL to check for
- `/listurls` - Lists added URLS
- `/backup IMAGE_URL` - Onetime force backup specific image link to Imgur

## Built With

  - [Node.js](https://nodejs.org/en/)
  - [discord.js](https://discord.js.org/#/)
  - [Imgur API](https://apidocs.imgur.com/)
  - [dotenv](https://github.com/motdotla/dotenv)

## Authors

  - **Chase Smith** -
    [GitHub](https://github.com/Freemann098)

## License

This project is licensed under the [MIT](https://mit-license.org/) License - see the [LICENSE.md](LICENSE.md) file for
details